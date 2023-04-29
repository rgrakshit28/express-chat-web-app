import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String },
    about: { type: String },
    avatar: { type: String },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
