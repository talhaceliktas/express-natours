import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel.ts";
import catchAsync from "../utils/catchAsync.ts";
import AppError from "../utils/appError.ts";

const signToken = (id: Object) => {
  // @ts-ignore
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
};

const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    console.log(typeof newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  }
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    // 2) Check if user exist && password is correct
    const user = await User.findOne({ email }).select("+password");

    // 3) If everything is ok, send token to client

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  }
);

export { signUp, login };
