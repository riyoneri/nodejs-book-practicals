import express from "express";
import { expressjwt } from "express-jwt";
import morgan from "morgan";
import { createWriteStream } from "node:fs";

import { router as authRouter } from "./auth/index.mjs";
import { router as movieRouter } from "./movie/index.mjs";

const app = express();
const accessLogStream = createWriteStream("access.log", { flags: "a" });

app.use(morgan("dev", { immediate: true, stream: accessLogStream }));
app.use(express.json());

app.use(
  "/movie",
  expressjwt({ secret: "secret", algorithms: ["HS256"] }),
  movieRouter,
);
app.use("/auth", authRouter);

app.use((error, _request, response, next) => {
  if (error.name === "UnauthorizedError")
    return response.status(401).json("Unauthorized");

  next();
});

app.get("/", (_, response) => response.redirect("/movie"));

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log("Server is listening to http://localhost:8080");
});
