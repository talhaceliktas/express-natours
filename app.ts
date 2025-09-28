import express from "express";
import fs from "fs";

import path from "path";
import { fileURLToPath } from "url";
import type { Tour } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const API_PREFIX = "/api/v1/";

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

app.get(`${API_PREFIX}tours`, (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get(`${API_PREFIX}tours/:id`, (req, res) => {
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
});

app.post(`${API_PREFIX}tours`, (req, res) => {
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
});

app.patch(`${API_PREFIX}tours/:id`, (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
