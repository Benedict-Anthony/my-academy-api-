import { Request, Errback, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = res.statusCode || 500;

  let message;
  switch (err.name) {
    case "MongoServerError":
      statusCode = 400;
      console.log(err);

      message = Object.keys(err.keyValue).map(
        (item) => `${item} already exist`
      );
      if (err.code === 11000) {
        res.status(statusCode).json({ message });
        return;
      }
    case "ValidationError":
      statusCode = 400;
      message = Object.keys(err.errors).map((item) => `${item} is required`);

      res.status(statusCode).json({ message });
      return;
    case "CastError":
      message = { message: "Not found" };
      res.status(404).json({ message });
      return;
    case "JsonWebTokenError":
      message = "Bearer or JWT token not set";
      res.status(400).json({ message });

    default:
      res.status(500).json({ message: "Server Error" });
  }
};

export default errorHandler;
