/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
import mongoose from "mongoose";

const genreEnum = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Fantasy",
  "Animation",
  "Documentary",
  "Mystery",
  "Crime",
  "Family",
  "Western",
];

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating must be at most 10"],
    },
    duration: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: genreEnum,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
