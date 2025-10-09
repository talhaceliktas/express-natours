import type { Request, Response } from "express";
import Tour from "../models/tourModel.js";

const getAllTours = async (req: Request, res: Response) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const getTour = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    // data: {
    //   tour,
    // },
  });
};

const createTour = async (req: Request, res: Response) => {
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

const updateTour = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json({
    status: "success",
    data: {
      // tour,
    },
  });
};

const deleteTour = (req: Request<{ id: string }>, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Tour was successfully deleted.",
  });
};

export { getAllTours, getTour, createTour, updateTour, deleteTour };
