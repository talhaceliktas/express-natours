import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

const getAllUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
