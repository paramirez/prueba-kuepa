import { Router } from "express";
import { PostCreateUser, GetPing } from "../controllers/usuario.controller";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";

export const UserRouter = Router({ mergeParams: true });

UserRouter.post("/", PostCreateUser);
UserRouter.get("/", AuthorizationMiddleware, GetPing);
