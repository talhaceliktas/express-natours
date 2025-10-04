import express from "express";

import {
  createTour,
  deleteTour,
  getAllTours,
  getTour,
  updateTour,
  checkId,
  checkBody,
} from "../controllers/tourController.js";

const router = express.Router();
router.param("id", checkId);

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

export default router;
