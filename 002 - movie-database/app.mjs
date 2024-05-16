import express from "express";
import morgan from "morgan";

import { router as movieRouter } from "./movie/index.mjs";

const app = express();

app.use(morgan("combined", { immediate: true }));

app.use("/movie", movieRouter);

app.get("/", (_, response) => response.redirect("/movie"));

app.listen(8080, () => {
  // eslint-disable-next-line no-undef, no-console
  console.log("Server is listening to http://localhost:8080");
});
