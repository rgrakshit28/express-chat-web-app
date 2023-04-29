import Chat from "../models/chat.js";
import User from "../models/user.js";

export const createIndividualChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const loggedInUserId = req.user._id;

    if (userId === loggedInUserId) {
      return res.status(400).json({ message: "You cannot start a chat with yourself" });
    }

    const existingChat = await Chat.findOne({
      type: "Individual",
      participants: {
        $all: [userId, loggedInUserId],
      },
    });

    if (existingChat) {
      return res.status(400).json({ message: "Chat already exists" });
    }

    const newChat = await Chat.create({
      type: "Individual",
      participants: [userId, loggedInUserId],
    });

    const user = await User.findById(userId);

    const chat = {
      chatId: newChat._id,
      type: newChat.type,
      participants: newChat.participants,
      user: {
        name: user.name,
        avatar: user.avatar,
      },
    };

    res.status(200).json({ message: "Individual Chat Created", chat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { avatar, name, about, participants } = req.body;
    const loggedInUserId = req.user._id;

    const existingUsers = await User.find({ _id: { $in: participants } });
    if (existingUsers.length !== participants.length) {
      return res.status(400).json({ message: "One or more participants not found" });
    }

    participants.push(loggedInUserId);

    const chat = await Chat.create({
      type: "Group",
      avatar: avatar || null,
      name,
      about,
      participants,
      admin: loggedInUserId,
    });

    res.status(200).json({ message: "Group Chat Created", chat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
