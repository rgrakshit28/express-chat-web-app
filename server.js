import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/database.js";
import userRoutes from "./src/routes/user.js";
import chatRoutes from "./src/routes/chat.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Users Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
  connectDb();
});
