import express from "express";
import { verifyToken } from "../config/auth.js";
import { createIndividualChat, createGroupChat } from "../controllers/chat.js";

const router = express.Router();

router.post("/individual", verifyToken, createIndividualChat);
router.post("/group", verifyToken, createGroupChat);

export default router;
