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

const update = async (movie) => {
  await connection.query("UPDATE Movies SET title = ?, year = ? WHERE id = ?", [
    movie.title,
    movie.year,
    movie.id,
  ]);

  return movie;
};

export const get = async (id) => {
  const [data] = await connection.query("SELECT * from Movies where id = ?", [
    id,
  ]);

  return data.pop();
};

export const remove = async (id) => {
  await connection.query("DELETE FROM Movies where id = ?", [id]);

  return;
};
export const save = (movie) => {
  return movie.id ? update(movie) : insert(movie);
};
