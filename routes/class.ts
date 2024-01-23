import express, { Router } from "express";
import {
  createClass,
  deleteClass,
  retrieveClass,
  retrieveClasses,
  updateClass,
} from "../controllers/classes";
import protect from "../middlewares/authMiddleware";

const classRouter: Router = express.Router();

classRouter.route("").post(protect, createClass).get(protect, retrieveClasses);
classRouter
  .route("/:id")
  .get(protect, retrieveClass)
  .put(protect, updateClass)
  .delete(protect, deleteClass);

export default classRouter;
