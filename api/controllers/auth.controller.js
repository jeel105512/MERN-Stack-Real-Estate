import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(errorHandler(404, "User not found!"));
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials!"));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const {password: pass, ...userInfo} = user._doc; // to remove the password for the response
    res
      .cookie("access_token", token, {
        httpOnly: true,
        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};
