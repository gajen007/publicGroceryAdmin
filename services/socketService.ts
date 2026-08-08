import { socketApiEndPoint } from "@/globals";
import { io, Socket } from "socket.io-client";

class SocketService {
  private _socket: Socket | null = null;

  connect(): Socket {
    if (!this._socket) {
      this._socket = io(socketApiEndPoint, {
        timeout: 1800000,
        transports: ["websocket"],
      });
    }
    return this._socket;
  }

  get socket(): Socket {
    if (!this._socket) {
      return this.connect();
    }
    return this._socket;
  }

  disconnect() {
    if (this._socket) {
      this._socket.disconnect();
      this._socket = null;
    }
  }
}

export const socketService = new SocketService();
