import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "You mush provide a user name"],
      unique: [true, "The User Name already exists"],
    },
    email: {
      type: String,
      required: [true, "You mush provide an email"],
      unique: [true, "The User Name already exists"],
    },
    password: {
      type: String,
      required: [true, "You mush provide a password"],
    },
  },
  { timestamps: true }
);

const User = mongoose.Model("User", userSchema);

export default User;