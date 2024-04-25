import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

const app = express();

app.listen(3000, () => {
  console.log("Server us running on server http://localhost:3000");
});

app.use("/api/user", userRouter);
