import { validationResult } from "express-validator";

import customValidationResult from "../helpers/custom-validation.mjs";
import Movie from "./model.mjs";

export const listAction = async (request, response) => {
  let sortOrder = 1;
  request.query.sort === "asc" && (sortOrder = 1);
  request.query.sort === "desc" && (sortOrder = -1);

  try {
    const movies = await Movie.find({
      $or: [{ userId: request.auth._id }, { public: true }],
    })
      .sort({
        title: sortOrder,
      })
      .transform((documents) =>
        documents.map((singleDocument) => singleDocument.toJSON()),
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

    const movie = await Movie.findOne({
      $and: [
        { _id: request.params.id },
        { $or: [{ public: true }, { userId: request.auth._id }] },
      ],
    });

    if (!movie) return response.status(404).send("Not Found");

    response.json({
      ...movie.toJSON(),
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
