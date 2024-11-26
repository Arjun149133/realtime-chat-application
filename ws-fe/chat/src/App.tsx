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

  const sendMessage = () => {
    if (!socket) return;
    if (!inputRef.current) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  };

  return (
    <div>
      <input type="text" ref={inputRef} placeholder="message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;
