import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "SUCCESS", status: "201", newUser });
  } catch (error) {
    next(error);
  }
};
