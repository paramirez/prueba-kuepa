import { CreateUser } from "../services/user.service";
import { BadRequest } from "./util";

export async function PostCreateUser(req, res, next) {
    try {
        const body = req.body;
        if (!body.name || !body.username || !body.password)
            throw BadRequest("Campos incompletos");
        const { _id } = await CreateUser(body);
        res.json({ user: _id });
    } catch (error) {
        if (error.name && error.name == "MongoError" && error.code == "11000") {
            console.log(error);
            return next(BadRequest("Usuario ya existente"));
        }
        next(error);
    }
}

export function GetPing(req, res, next) {
    res.json({
        status: "ok",
    });
}
