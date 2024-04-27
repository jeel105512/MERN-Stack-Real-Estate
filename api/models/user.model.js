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
    avatar: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Dprofile&psig=AOvVaw1U2hYjedKBxI1QLMfjr4gy&ust=1714325847337000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDg-dL34oUDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
