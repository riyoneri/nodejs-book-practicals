import { get, getAll, remove } from "./model.mjs";

export const listAction = async (_request, response) => {
  response.send(await getAll());
};

export const removeAction = async (request, response) => {
  const id = +request.params.id;

  await remove(id);

  response.redirect(request.baseUrl);
};

export const formAction = async (request, response) => {
  let movie = { id: "", title: "", year: "" };

  if (request.params.id) {
    movie = await get(+request.params.id);
  }

  response.send(movie);
};
