/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", createMovie);
movieRouter.patch("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;
