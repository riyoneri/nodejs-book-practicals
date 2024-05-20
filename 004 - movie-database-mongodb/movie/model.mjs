import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb://localhost:27017/moviedb");

const Movie = mongoose.model(
  "Movie",
  new Schema({ title: String, year: Number }),
);

export const getAll = async () => Movie.find({});

export const get = async (id) => Movie.findById(id);

export const insert = async (movie) => {
  const movieData = new Movie({ title: movie.title, year: movie.year });

  return await movieData.save();
};

export const update = async (movie) => {
  await Movie.findByIdAndUpdate(movie.id, {
    title: movie.title,
    year: movie.year,
  });

  return movie;
};

export const remove = async (id) => Movie.findByIdAndDelete(id);

export const save = (movie) => {
  if (movie._id) return update(movie);
  insert(movie);
};
