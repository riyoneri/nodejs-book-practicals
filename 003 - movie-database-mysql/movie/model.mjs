import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "topSecret",
  database: "movie-db",
});

await connection.connect();

export const getAll = () => {};
export const get = (_id) => {};
export const remove = (_id) => {};
export const save = (_movie) => {};
