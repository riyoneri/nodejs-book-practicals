import { getAll, remove } from "./model.mjs";

export const listAction = async (_request, response) => {
  response.send(await getAll());
};

export const removeAction = async (request, response) => {
  const id = +request.params.id;

  await remove(id);

  response.redirect(request.baseUrl);
};
