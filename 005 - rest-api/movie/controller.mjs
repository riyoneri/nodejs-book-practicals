import { Types } from "mongoose";

import { get, getAll } from "./model.mjs";

export const listAction = async (request, response) => {
  try {
    const movies = await getAll(new Types.ObjectId("507f1f77bcf86cd799439011"));

    response.json({
      movies,
      links: [{ rel: "self", href: request.baseUrl + "/" }],
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
      links: [{ rel: "self", href: `${request.baseUrl}/${movie?.id}` }],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};
