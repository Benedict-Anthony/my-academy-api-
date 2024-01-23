import mongoose from "mongoose";
import colors from "colors";

const connectdb = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL as string);
  console.log(
    colors.blue.bold(`Database connected on Port ${connection.connection.host}`)
  );
};

export default connectdb;
