import { getAll } from "./model.mjs";

export const listAction = async (_request, response) => {
  response.send(await getAll());
};
