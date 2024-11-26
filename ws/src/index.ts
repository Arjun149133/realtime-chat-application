import { WebSocketServer, WebSocket } from "ws";

let rooms: Map<string, WebSocket[]> = new Map();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws: WebSocket) {
  console.log("user connected");
  ws.on("message", function message(data) {
    let { type, payload } = JSON.parse(data.toString());
    console.log(type, payload);

    if (type === "join") {
      console.log(rooms);
      let users = rooms.get(payload.roomId);
      let oldUsers = users?.map((socket) => socket);
      if (!oldUsers) {
        oldUsers = [];
      }
      oldUsers.push(ws);
      rooms.set(payload.roomId, oldUsers);
    } else if (type === "chat") {
      let users = rooms.get(payload.roomId);
      users?.map((user) => user.send(payload.message));
    }
  });
});
