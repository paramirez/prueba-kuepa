import io from "socket.io-client";
import store from "../store";

export class ChatClient {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  init(path, user) {
    console.log(path);
    this.socket = io.connect(path);
    this.socket.on("connect", () => {
      this.connected = true;
      this.events(user);
    });
  }

  sendMessage(content) {
    this.socket.emit("message:new", content);
    this.addMessage(content);
  }

  addMessage(content) {
    store.dispatch("onNewMessage", content);
  }

  events(user) {
    this.socket.on("message:new", (content) => {
      if (content.user !== user.user) this.addMessage(content);
    });
  }
}
