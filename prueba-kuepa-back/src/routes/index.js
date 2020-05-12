import { Router } from "express";
import { UserRouter } from "./user.router";
import { AuthRouter } from "./auth.controller";
import { RoomRouter } from "./room.router";

export const router = Router({ mergeParams: true });

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
router.use("/room", RoomRouter);
