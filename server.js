import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./src/config/database.js";
import userRoutes from "./src/routes/user.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Users Routes
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
  connectDb();
});
