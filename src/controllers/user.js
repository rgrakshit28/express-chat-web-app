import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateToken } from "../config/auth.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);

    res.cookie("jwt", token, { httpOnly: true });

    return res.status(200).json({ message: "User created", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("jwt", token, { httpOnly: true });

    return res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let users;

    if (search) {
      users = await User.find({
        _id: { $ne: req.user._id },
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      users = await User.find();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
