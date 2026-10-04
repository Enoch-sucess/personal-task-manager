import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const generateToken = (id: mongoose.Types.ObjectId): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  return jwt.sign({ id: id.toString() }, secret, { expiresIn: "7d" });
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All Fields Required" });
      return;
    }

    const userExist = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExist) {
      const field = userExist.email === email ? "Email" : "Username";
      res.status(400).json({ message: `${field} already in use` });
      return;
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({ message: "All Fields Required" });
      return;
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "server Error";
    res.status(500).json({ message });
  }
};
