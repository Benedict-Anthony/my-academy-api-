import jwt from "jsonwebtoken";

export const generateToken = (id: string | number, email: string) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY as string, {
    expiresIn: "3d",
  });
};
