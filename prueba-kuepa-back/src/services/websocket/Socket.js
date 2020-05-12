import http from "http";
import SocketIO from "socket.io";

class SocketIOImpl {
    constructor() {
        /**
         * @type {SocketIO.Server}
         */
        this.io = null;
    }

    /**
     *
     * @param {http.Server} server
     */
    init(server) {
        if (!this.io)
            this.io = SocketIO.listen(server, {
                serveClient: false,
                transports: ["polling", "websocket"],
            });
    }

    getSocket() {
        return this.io;
    }
}

export const Socket = new SocketIOImpl();
