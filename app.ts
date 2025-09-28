import express from "express";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";

import type { Tour } from "./types.js";
import type { Request, Response } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const API_PREFIX = "/api/v1/";

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req: Request, res: Response) => {
  console.log(req.params);

  const tour = tours.find((el: Tour) => el.id === Number(req.params.id));

  if (!tour)
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req: Request, res: Response) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req: Request<{ id: string }>, res: Response) => {
  const tour = tours.find((tour: Tour) => tour.id === +req.params.id);

  if (!tour)
    res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });

  if (!req.body)
    res.status(400).json({
      status: "fail",
      message: "Empty Body",
    });

  Object.assign(tour, req.body);

  fs.writeFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  ); // Its blocking system but it's a small app.

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const deleteTour = (req: Request<{ id: string }>, res: Response) => {
  const index = tours.findIndex((tour: Tour) => tour.id === +req.params.id);

  if (index === -1)
    return res.status(404).json({ status: "fail", message: "Tour not found" });

  tours.splice(index, 1);

  fs.writeFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
  ); // Its blocking system but it's a small app.

  res.status(200).json({
    status: "success",
    message: "Tour was successfully deleted.",
  });
};

// app.get(`${API_PREFIX}tours`, getAllTours);
// app.post(`${API_PREFIX}tours`, createTour);
// app.get(`${API_PREFIX}tours/:id`, getTour);
// app.patch(`${API_PREFIX}tours/:id`, updateTour);
// app.delete(`${API_PREFIX}tours/:id`, deleteTour);

app.route(`${API_PREFIX}tours`).get(getAllTours).post(createTour);
app
  .route(`${API_PREFIX}tours/:id`)
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
