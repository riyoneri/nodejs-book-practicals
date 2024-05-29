import { validationResult } from "express-validator";
import { Types } from "mongoose";

import customValidationResult from "../helpers/custom-validation.mjs";
import Movie, { get, getAll } from "./model.mjs";

export const listAction = async (request, response) => {
  let sortOrder = 1;
  request.query.sort === "asc" && (sortOrder = 1);
  request.query.sort === "desc" && (sortOrder = -1);

  try {
    const movies = await getAll(
      new Types.ObjectId("507f1f77bcf86cd799439011"),
      sortOrder,
    );

    response.json({
      movies,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};

export const detailAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });

    const movie = await get(
      request.params.id,
      new Types.ObjectId("507f1f77bcf86cd799439011"),
    );

    if (!movie) return response.status(404).send("Not Found");

    response.json({
      ...movie,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};

export const createAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });

    const newMovie = new Movie({
      title: request.body.title,
      year: request.body.year,
      public: +request.body.public === 1 ? true : false,
      userId: request.auth._id,
    });

    await newMovie.save();

    response.status(201).json(newMovie.toJSON());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};

export const updateAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });

    const updatedMovie = await Movie.findByIdAndUpdate(
      request.params.id,
      {
        title: request.body.title,
        year: request.body.year,
        public: +request.body.public === 1 ? true : false,
      },
      { new: true },
    );

    response.status(201).json(updatedMovie.toJSON());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};

export const deleteAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });

    await Movie.findByIdAndDelete(request.params.id);

    response.status(204).json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};
