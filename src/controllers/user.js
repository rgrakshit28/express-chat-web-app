import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../config/auth.js";

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

    return res.status(201).json({ message: "User created", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};