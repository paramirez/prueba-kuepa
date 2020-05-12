import { AllRooms, RoomById } from "../services/chatroom.service";

export async function GetAllRooms(req, res, next) {
    try {
        const rooms = await AllRooms();
        res.json({ rooms });
    } catch (error) {
        next(error);
    }
}

export async function GetRoomById(req, res, next) {
    try {
        const { id } = req.params;
        const room = await RoomById(id);
        res.json(room);
    } catch (error) {
        next(error);
    }
}
