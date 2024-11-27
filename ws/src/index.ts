import { WebSocketServer, WebSocket } from "ws";
import { User } from "./User";

const ws = new WebSocketServer({ port: 8080 });

const rooms = new Map<string, User[]>();

ws.on("connection", (socket: WebSocket) => {
  const user = new User("arjun", socket);
  socket.on("message", (data) => {
    const { type, payload } = JSON.parse(data.toString());

    if (type === "join") {
      const room = rooms.get(payload.roomId);
      if (!room) {
        rooms.set(payload.roomId, [user]);
      } else {
        room.push(user);
      }
      socket.send(
        JSON.stringify({
          type: "JOINED",
          payload: {
            roomId: payload.roomId,
            username: user.username,
            message: "joined the room",
          },
        })
      );
    } else if (type === "chat") {
      const { roomId, message } = payload;
      const room = rooms.get(roomId);

      if (!room) {
        socket.send(
          JSON.stringify({
            type: "ROOM_NOT_FOUND",
            payload: {
              message: "no such room found honey",
            },
          })
        );
        return;
      }

      room?.forEach((u) => {
        u.socket.send(
          JSON.stringify({
            type: "message",
            payload: {
              message,
              sentBy: user.username,
            },
          })
        );
      });
    }
  });

  socket.on("close", () => {
    for (const [roomId, room] of rooms.entries()) {
      const userIndex = room.findIndex((u) => u.socket === socket);

      if (userIndex !== -1) {
        room.splice(userIndex, 1);

        if (room.length === 0) {
          rooms.delete(roomId);
        }
        break;
      }
    }
    socket.close();
  });
});
