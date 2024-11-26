import { randomUUID } from "crypto";
import { WebSocket } from "ws";

export class User {
  public id: string;
  public username: string;
  public socket: WebSocket;

  constructor(username: string, socket: WebSocket, id?: string) {
    this.id = id ?? randomUUID();
    this.socket = socket;
    this.username = username;
  }
}
