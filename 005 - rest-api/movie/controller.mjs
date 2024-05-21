import { Types } from "mongoose";

import { get, getAll } from "./model.mjs";

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
