/* eslint-disable quotes */
/* eslint-disable semi */
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connect = () => {
  mongoose.connect(process.env.DB_CONNECT_URI);

  const { connection } = mongoose;

  connection.once("open", () => {
    console.log("Database connection established");
  });

  connection.on("error", (error) => {
    console.error("Database connection error:", error);
  });
};

export { connect };
