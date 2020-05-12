import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        room: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Room",
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        content: {
            //Puede ser mas abstracto, como multimedia, documentos, etc
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Message = model("Message", MessageSchema, "messages");
