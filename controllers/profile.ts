import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import StudentProfile from "../models/userProfile";

const createProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user;
    const data = await StudentProfile.create({ ...req.body, user: userId });

    res.status(201).json({ success: true, data });
  }
);

const retrieveProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user;
    const data = await StudentProfile.findOne({ user: userId })
      .populate({
        path: "user",
        select: "username email",
      })
      .exec();

    res.status(200).json({ success: true, data });
  }
);
const updateProfile = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.user;
    const profile = await StudentProfile.findOne({ user: userId });

    const data = await StudentProfile.findByIdAndUpdate(
      { _id: profile?.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data });
  }
);

export { createProfile, updateProfile, retrieveProfile };
