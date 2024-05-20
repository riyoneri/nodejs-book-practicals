import mongoose, { Schema, Types } from "mongoose";

mongoose.connect("mongodb://localhost:27017/movie-db");

const Movie = mongoose.model(
  "Movie",
  new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true },
    public: { type: Boolean, required: true },
  }),
);

export const getAll = async (userId) =>
  Movie.find({ $or: [{ userId }, { public: true }] });

export const get = async (movieId, userId) =>
  Movie.findOne({
    $and: [{ _id: movieId }, { $or: [{ public: true }, { userId }] }],
  });
