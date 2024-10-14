import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/db.js";

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use("/api/user-api", userRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running at port: 4000");
});
