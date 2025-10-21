import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.ts";
import userRouter from "./routes/userRoutes.ts";
import globalErrorHandler from "./controllers/errorController.ts";

const __dirname = import.meta.dirname;

import dotenv from "dotenv";
import AppError from "./utils/appError.ts";
dotenv.config({ path: "./config.env", quiet: true });

const app = express();
const API_PREFIX = "/api/v1/";

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.set("query parser", "extended");

app.use(`${API_PREFIX}tours`, tourRouter);
app.use(`${API_PREFIX}users`, userRouter);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
