/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import express from "express";
import { connect } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import ticketRouter from "./routes/ticketRoutes.js";

const PORT = process.env.PORT || 3000;
connect();

const api = express();
api.use(express.json());

api.use("/api/v1/users", userRouter);
api.use("/api/v1/movies", movieRouter);
api.use("/api/v1/tickets", ticketRouter);

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
