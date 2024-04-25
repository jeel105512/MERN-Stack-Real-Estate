import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, __) => {
  try {
    const { userName, email, password } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "SUCCESS", status: "201", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};
