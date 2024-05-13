/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import Movie from "../models/Movie.js";

const handleServerError = (res, error) => {
  res.status(500).json({ message: error.message });
};

const createMovie = async (req, res) => {
  const movieData = req.body;
  try {
    if (!movieData) {
      return res.status(400).json({ message: "Movie data is missing" });
    }
    const newMovie = new Movie(movieData);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      return res
        .status(404)
        .json({ message: "There are no movies in this database" });
    }
    res.status(200).json(movies);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movieData = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, movieData, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  if (req.query.destroy === "true") {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if (!deletedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.status(204).json();
    } catch (err) {
      handleServerError(res, err);
    }
  } else {
    try {
      const movie = await Movie.findByIdAndUpdate(id, { isActive: false });
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      res.status(204).json();
    } catch (error) {
      handleServerError(res, error);
    }
  }
};

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };
