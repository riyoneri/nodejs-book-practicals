import { Types } from "mongoose";

import { get, getAll } from "./model.mjs";

export const listAction = async (request, response) => {
  const movies = await getAll(new Types.ObjectId("507f1f77bcf86cd799439011"));

  response.json({
    movies,
    links: [{ rel: "self", href: request.baseUrl + "/" }],
  });
};

export const detailAction = async (request, response) => {
  const movie = await get(
    request.params.id,
    new Types.ObjectId("507f1f77bcf86cd799439011"),
  );

  response.json({
    ...movie,
    links: [{ rel: "self", href: `${request.baseUrl}/${movie?.id}` }],
  });
};
