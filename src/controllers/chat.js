import Chat from "../models/chat.js";

export const createChat = async (req, res) => {
  try {
    const { type, participant } = req.body;
    const currentUser = req.user._id;

    const chat = await Chat.create({
      type,
      participants: [currentUser, participant],
    });

    return res.status(200).json({ message: "Chat created", chat });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
