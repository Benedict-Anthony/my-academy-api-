import express, { Router } from "express";
import { loginHandler, signUpHandler } from "../controllers/auth";

const authRouter: Router = express.Router();

authRouter.route("/login").post(loginHandler);
authRouter.route("/signup").post(signUpHandler);

//login route

export default authRouter;
