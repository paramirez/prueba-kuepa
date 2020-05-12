import { Socket } from "./websocket/Socket";
import { Room } from "../models/Room";

/**
 * Carga las salas de conversación actuales y crea un namespaces por cada 1
 */
export async function LoadChatRooms() {
    const rooms = await Room.find();
    console.log(`${rooms.length} Rooms`);
    rooms.forEach((room) => {
        const nsp = Socket.getSocket().of(`${room.namespaceName}`);
        nsp.on("connection", (socket) => {
            console.log("OnConnection");
            processSocket(nsp, socket, room._id);
        });
    });
}

export async function AllRooms() {
    return await Room.find({}, "name namespaceName _id history");
}

/**
 * @param {String} id
 */
export async function RoomById(id) {
    return await Room.findById(id);
}

/**
 *
 * @param {SocketIO.Namespace} nsp
 * @param {SocketIO.Socket} socket
 */
function processSocket(nsp, socket, roomId) {
    console.log(`NSP ${nsp.name} join`);
    socket.on("message:new", async (content) => {
        console.log(`NSP ${nsp.name} message:new`);
        Room.findByIdAndUpdate(roomId, {
            $push: {
                history: content,
            },
        }).exec();
        nsp.emit("message:new", content);
    });
    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });
}
