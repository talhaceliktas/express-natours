import app from "./app.ts";
import mongoose from "mongoose";

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
  console.log(err.name, err.message);
  console.log("Unhandled rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
