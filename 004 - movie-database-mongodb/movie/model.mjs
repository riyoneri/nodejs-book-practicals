import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/moviedb");

const Movie = mongoose.model("Movie", { title: String, year: Number });

export const getAll = async () => Movie.find({});

export const insert = async (_movie) => {};

export const update = async (_movie) => {};

export const get = async (_id) => {};

export const remove = async (_id) => {};

export const save = (_movie) => {};
