import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response, Request } from "express";
import User from "../models/User";

const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    let foundToken;
    if (authToken?.startsWith("Bearer")) {
      foundToken = authToken
        .split("")
        .slice("Bearer".length + 1)
        .join("");
    } else if (authToken?.startsWith("JWT")) {
      foundToken = authToken
        .split("")
        .slice("JWT".length + 1)
        .join("");
    } else {
      res.status(400).json({ message: "Bearer or JWT token not set" });
      return;
    }

    if (!foundToken) {
      res.status(400).json({ message: "Bearer or JWT token not set" });
    }

    const verifyToken: any = jwt.verify(
      foundToken,
      process.env.SECRET_KEY as string
    );

    const user = await User.findOne({
      email: verifyToken.email,
      _id: verifyToken.id,
    });

    if (!user) {
      res.status(404).json({ message: "Invalid token" });
      return;
    }

    // @ts-ignore
    req.user = user.id;
    next();
  }
);

export default protect;
