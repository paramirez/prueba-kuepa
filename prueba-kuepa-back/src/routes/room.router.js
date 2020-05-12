import { Router } from "express";
import { GetAllRooms, GetRoomById } from "../controllers/room.controller";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";

export const RoomRouter = Router();

RoomRouter.get("/", AuthorizationMiddleware, GetAllRooms);
RoomRouter.get("/:id", AuthorizationMiddleware, GetRoomById);
