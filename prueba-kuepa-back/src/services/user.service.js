import { User } from "../models/User";

export async function CreateUser(userData) {
    const user = new User(userData);
    return await user.save();
}

/**
 * @param {String} username
 * @param {String} password
 */
export async function AuthenticateUser(username, password) {
    const user = await User.findOne({ username });
    if (!user || !user.comparePassword(password)) return false;
    return user;
}
