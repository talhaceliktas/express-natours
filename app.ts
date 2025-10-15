import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const __dirname = import.meta.dirname;

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const app = express();
const API_PREFIX = "/api/v1/";

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.set("query parser", "extended");

app.use(`${API_PREFIX}tours`, tourRouter);
app.use(`${API_PREFIX}users`, userRouter);

export default app;
