import app from "./app.ts";
import mongoose from "mongoose";

process.on("uncaughtException", (err) => {
  console.log("Uncaught rejection. Shutting down...");
  console.log(err);
  process.exit(1);
});

const port = process.env.PORT || 8000;

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD!
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successfull!");
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled rejection. Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
