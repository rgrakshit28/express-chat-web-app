import express from "express";
import { login, logout, getUsers, signup } from "../controllers/user.js";
import { verifyToken } from "../config/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/users", verifyToken, getUsers);

export default router;
