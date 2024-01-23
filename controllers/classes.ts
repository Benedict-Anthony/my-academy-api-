import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Class from "../models/class";

const createClass = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = await Class.create(req.body);
  res.status(201).json({ success: true, data });
});

const retrieveClasses = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data = await Class.find().exec();
    res.status(200).json({ count: data.length, data });
  }
);

const retrieveClass = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await Class.findById({ _id: id }).populate({
      path: "subjects",
      select: "subjectName description -class",
    });
    res.status(200).json({ success: true, data });
  }
);

const updateClass = expressAsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await Class.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data });
});

const deleteClass = expressAsyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await Class.findByIdAndDelete(id);
  res.status(204).json({});
});

export {
  deleteClass,
  createClass,
  updateClass,
  retrieveClasses,
  retrieveClass,
};
