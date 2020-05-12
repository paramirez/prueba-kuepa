import { BadRequest } from "./util";
import { AuthenticateUser } from "../services/user.service";
import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config";

export async function PostLogin(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw BadRequest("Falta usuario y contraseña");

        const user = await AuthenticateUser(username, password);
        if (!user) throw BadRequest("Usuario o contraseña incorrecta");

        const payload = {
            name: user.name,
            user: user._id,
            role: user.role,
        };
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: 3600,
        });
        res.json({
            message: "Autenticacion correcta",
            token,
        });
    } catch (error) {
        next(error);
    }
}

export async function GetSession(req, res, next) {
    try {
        if (req._user) res.json({ valid: true });
        else throw { status: 401, message: "InvalidToken" };
    } catch (error) {
        next(error);
    }
}
