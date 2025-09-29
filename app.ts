import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const API_PREFIX = "/api/v1/";

app.use(express.json());

app.use(morgan("dev"));

app.use(`${API_PREFIX}tours`, tourRouter);
app.use(`${API_PREFIX}users`, userRouter);

export default app;
