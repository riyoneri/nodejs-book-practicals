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
