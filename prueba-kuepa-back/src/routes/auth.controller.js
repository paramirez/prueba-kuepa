import { Router } from "express";
import { PostLogin, GetSession } from "../controllers/auth.controller";
import { AuthorizationMiddleware } from "../middlewares/AuthorizationMiddleware";
export const AuthRouter = Router();

AuthRouter.post("/login", PostLogin);
AuthRouter.get("/valid", AuthorizationMiddleware, GetSession);
