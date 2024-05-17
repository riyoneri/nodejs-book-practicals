let data = [
  { id: 1, title: "Iron Man", year: "2008" },
  { id: 2, title: "Thor", year: "2011" },
  { id: 3, title: "Captain America", year: "2011" },
];

export const getAll = () => Promise.resolve(data);

export const get = (id) =>
  Promise.resolve(data.find((movie) => movie.id === id));

export const remove = (id) => {
  data = data.filter((movie) => movie.id !== id);

  return Promise.resolve();
};

const getNextId = () => Math.max(...data.map((movie) => movie.id)) + 1;

const insert = (movie) => {
  movie.id = getNextId();

  data.push(movie);
};

const update = (movie) => {
  movie.id = +movie.id;
  const index = data.findIndex((item) => item.id === movie.id);

  data[index] = movie;
};

export const save = (movie) => {
  if (movie.id) update(movie);
  else insert(movie);

  Promise.resolve();
};
