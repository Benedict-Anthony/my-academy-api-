import express from "express";
import dontenv from "dotenv";
import morgan from "morgan";
import connectdb from "./config/db";
import authRouter from "./routes/auth";
import cors from "cors";
import colors from "colors";
import errorHandler from "./middlewares/errorMiddleWare";
import classRouter from "./routes/class";
import subjectRouter from "./routes/subject";
import profileRouter from "./routes/profile";

// LOAD ENVRON
dontenv.config();

const PORT = process.env.PORT || 5000;
const URL_VERSION = process.env.URL_VERSION;
// console.log()
const app = express();
app.use(cors());

if (process.env.DEVELOPEMENT) {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectdb();

// loads routes

app.get(`${URL_VERSION}/`, async (req, res) => {
  res.status(200).json({ msg: "Welcome to chatme", version: "v1" });
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/classes", classRouter);
app.use("/api/subjects", subjectRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(colors.blue.bold(`Server Running on port ${PORT}`))
);
