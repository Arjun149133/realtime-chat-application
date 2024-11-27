import { useEffect, useRef, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    };
  }, []);

  const joinRoom = () => {
    if (!socket) return;
    socket.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: "hot",
        },
      })
    );
  };

  const sendMessage = () => {
    if (!socket) return;
    if (!inputRef.current) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          roomId: "hot",
          message: message,
        },
      })
    );
  };

  return (
    <div className="">
      <input type="text" ref={inputRef} placeholder="message..." />
      <button onClick={joinRoom}>Join Hot Room</button>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
