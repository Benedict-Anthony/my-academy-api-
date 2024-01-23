import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Subject from "../models/subjects";

const createSubject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data = await Subject.create(req.body);
    res.status(201).json({ success: true, data });
  }
);

const retriveSubjects = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data = await Subject.find();
    res.status(200).json({ count: data.length, data });
  }
);
const searchFIlterm = async (req: Request, res: Response) => {
  let data = await Subject.find();
  console.log(data);
  data = data.filter(
    (item) =>
      item.subjectName.includes(req.params?.subjectName) ||
      item.description.includes(req.params?.description)
  );
  res.status(200).json({ count: data.length, data });
};

const retriveSubject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await Subject.findById({ _id: id });
    res.status(200).json({ success: true, data });
  }
);
const updateSubject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await Subject.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data });
  }
);

const deleteSubject = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    await Subject.findByIdAndDelete({ _id: id });
    res.status(204).json({});
  }
);

export {
  createSubject,
  updateSubject,
  retriveSubject,
  deleteSubject,
  retriveSubjects,
  searchFIlterm,
};
