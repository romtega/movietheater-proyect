/* eslint-disable quotes */
/* eslint-disable semi */
import express from "express";

const PORT = process.env.PORT || 3000;

const api = express();
api.use(express.json());

api.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
