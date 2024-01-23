import express, { Router } from "express";
import protect from "../middlewares/authMiddleware";
import {
  createProfile,
  retrieveProfile,
  updateProfile,
} from "../controllers/profile";

const profileRouter: Router = express.Router();

profileRouter
  .route("")
  .post(protect, createProfile)
  .put(protect, updateProfile)
  .get(protect, retrieveProfile);

export default profileRouter;
