import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError.ts";

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: any, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unkown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR", err);

    // 2) Send generic
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
  else if (process.env.NODE_ENV === "production") {
    let error = err;

    if (error.name === "CastError") error = handleCastErrorDB(error);

    sendErrorProd(error, res);
  }
};
