import express from "express";
import { verifyToken } from "../config/auth.js";
import { createChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/", verifyToken, createChat);

export default router;
