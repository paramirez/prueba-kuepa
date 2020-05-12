import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { PORT, MONGO_CONNECTION_STRING } from "./config";
import { Socket } from "./services/websocket/Socket";
import { MongoConnect, MongoCloseConnection } from "./libs/mongodb";
import { Connection as MongooseConnection } from "mongoose";
import { LoadChatRooms } from "./services/chatroom.service";
import { router } from "./routes";
import ErrorMiddleware from "./middlewares/ErrorMiddleware";

/**
 * @type {MongooseConnection}
 */
let mongoConnection;

async function initialize() {
    try {
        const app = express();
        const server = http.createServer(app);
        mongoConnection = await MongoConnect(MONGO_CONNECTION_STRING);

        app.use(cors());
        app.use(bodyParser.json());
        app.use(morgan("dev"));
        app.use("/api", router);
        app.use(ErrorMiddleware);

        server.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
        Socket.init(server);
        await LoadChatRooms();
    } catch (error) {
        MongoCloseConnection(mongoConnection);
        console.log(error);
    }
}

process.on("SIGINT", async function () {
    await MongoCloseConnection(mongoConnection);
    process.exit();
});

initialize();
