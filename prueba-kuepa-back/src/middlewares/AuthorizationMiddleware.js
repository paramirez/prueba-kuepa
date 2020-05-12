import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export async function AuthorizationMiddleware(req, res, next) {
    const invalidTokenError = { status: 401, message: "Invalid token" };
    try {
        /**@type {String} */
        const bearer = req.header("Authorization");
        if (!bearer || !bearer.includes("Bearer")) throw invalidTokenError;
        const token = bearer.split("Bearer")[1].trim();
        const decode = jwt.verify(token, JWT_SECRET);
        req._user = decode;
        next();
    } catch (error) {
        console.log(error);
        if (error.name) {
            return next(invalidTokenError);
        }
        next(error);
    }
}
