import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.ts";
import catchAsync from "../utils/catchAsync.ts";

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // @ts-ignore
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN!,
    });

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

export { signUp };
