import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

const app = express();

// allow to send json to the server
app.use(express.json());

app.listen(3000, () => {
  console.log("Server us running on server http://localhost:3000");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  
  console.error(errorMessage);
  
  return res.status(statusCode).json({
    success: false,
    statusCode,
    errorMessage,
  });
});
