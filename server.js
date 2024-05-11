/* eslint-disable quotes */
/* eslint-disable semi */
import express from "express";
import { connect } from "./config/databse.js";

const PORT = process.env.PORT || 3000;
connect();

const api = express();
api.use(express.json());

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
