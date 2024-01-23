import express, { Router } from "express";
import {
  createSubject,
  deleteSubject,
  retriveSubject,
  retriveSubjects,
  updateSubject,
} from "../controllers/subjects";
import protect from "../middlewares/authMiddleware";

const subjectRouter: Router = express.Router();

subjectRouter
  .route("")
  .post(protect, createSubject)
  .get(protect, retriveSubjects);

subjectRouter
  .route("/:id")
  .get(protect, retriveSubject)
  .put(protect, updateSubject)
  .delete(protect, deleteSubject);
export default subjectRouter;
