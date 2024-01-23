import express, { Request, Response, Router } from "express";
import User from "../models/User";
import bycript from "bcryptjs";
import { generateToken } from "../lib/generateToken";
import expressAsyncHandler from "express-async-handler";

const signUpHandler = expressAsyncHandler(
  async (req: Request, res: Response, next) => {
    const user = await User.create({ ...req.body });
    const { username, email } = user;
    const token = generateToken(user.id, email);
    res.json({ sucess: true, username, email, token });
  }
);

const loginHandler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });

    //check if user exits
    if (!user) {
      res
        .status(404)
        .json({ sucess: false, message: "email or password incorrect" });
      return;
    }
    //verify password
    const hashPassword = bycript.compareSync(password, user.password);
    if (!hashPassword) {
      res
        .status(404)
        .json({ sucess: false, message: "email or password incorrect" });
      return;
    }
    const { username, id } = user;
    const token = generateToken(user.id, user.email);
    res.json({ sucess: true, username, email, token });
  }
);

export { signUpHandler, loginHandler };
