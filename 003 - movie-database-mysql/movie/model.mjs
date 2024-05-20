import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "topSecret",
  database: "movie-db",
});

await connection.connect();

export const getAll = async () => {
  const [data] = await connection.query("SELECT * FROM Movies");

  return data;
};

const insert = async (movie) => {
  const [result] = await connection.query(
    "INSERT INTO Movies (title, year) VALUES (?, ?)",
    [movie.title, movie.year],
  );

  return { ...movie, id: result.insertId };
};

export const get = async (id) => {
  const [data] = await connection.query("SELECT * from Movies where id = ?", [
    id,
  ]);

  return data.pop();
};
export const remove = (_id) => {};
export const save = (movie) => {
  if (!movie.id) return insert(movie);
};
