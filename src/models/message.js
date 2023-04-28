import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    message: { type: String },
    media_url: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    reactions: [
      { user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, emoji: { type: String } },
    ],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    read_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
