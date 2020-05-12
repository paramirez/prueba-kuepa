import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const PORT = env.PORT || 8080;
export const MONGO_CONNECTION_STRING =
    env.MONGO_CONNECTION_STRING || "mongodb://localhost:27020/kuepa";
export const JWT_SECRET = env.JWT_SECRET || "superhypersecret";
export const TOKEN_EXPIRES_IN = env.TOKEN_EXPIRES_IN || 3600;
