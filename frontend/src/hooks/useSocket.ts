import { useEffect, useState } from "react";
import { WS_URL } from "../config";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [socket]);

  return socket;
};
