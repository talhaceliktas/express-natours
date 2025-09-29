import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const API_PREFIX = "/api/v1/";

// 1) MIDDLEWARES

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  // req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use(`${API_PREFIX}tours`, tourRouter);
app.use(`${API_PREFIX}users`, userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
