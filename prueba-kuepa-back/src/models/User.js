import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
    {
        name: {
            required: true,
            type: String,
        },
        username: {
            required: true,
            unique: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        role: {
            //Puede hacerce con una colección adicional y permisos
            type: String,
            enum: ["ESTUDIANTE", "MODERADOR"],
            default: "ESTUDIANTE",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10).then(
        (result) => {
            user.password = result;
            next();
        },
        (err) => next(err)
    );
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = model("User", UserSchema, "users");
