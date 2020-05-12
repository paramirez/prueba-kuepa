import { Schema, model } from "mongoose";

const RoomSchema = new Schema(
    {
        name: {
            required: true,
            unique: true,
            type: String,
        },
        namespaceName: String,
        history: [],
        activeUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

RoomSchema.pre("save", function (next) {
    this.namespaceName = "/" + this.name.trim().replace(/ /g, "");
    next();
});

export const Room = model("Room", RoomSchema, "rooms");
