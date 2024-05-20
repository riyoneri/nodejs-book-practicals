import { Types } from "mongoose";

import { getAll } from "./model.mjs";

export const listAction = async (request, response) => {
  const movies = await getAll(new Types.ObjectId("507f1f77bcf86cd799439011"));

  response.json({
    movies,
    links: [{ rel: "self", href: request.baseUrl + "/" }],
  });
};
