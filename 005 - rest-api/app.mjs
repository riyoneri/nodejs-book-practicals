import express from "express";
import { expressjwt } from "express-jwt";
import { Types } from "mongoose";
import morgan from "morgan";
import { createWriteStream } from "node:fs";
import swaggerUi from "swagger-ui-express";

import { router as authRouter } from "./auth/index.mjs";
import User from "./auth/model.mjs";
import { router as movieRouter } from "./movie/index.mjs";
import swaggerSpec from "./swagger.mjs";

const app = express();
const accessLogStream = createWriteStream("access.log", { flags: "a" });

app.use(morgan("dev", { immediate: true, stream: accessLogStream }));
app.use(express.json());

app.use(
  "/movie",
  expressjwt({ secret: "secret", algorithms: ["HS256"] }),
  async (request, _response, next) => {
    const user = await User.findById(
      Types.ObjectId.createFromHexString(request.auth.id),
    );
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";

    if (!user) return next(error);

    next();
  },
  movieRouter,
);
app.use("/auth", authRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((error, _request, response, _next) => {
  if (error.name === "UnauthorizedError")
    return response.status(401).json("Unauthorized");

  response.status(500).send("An error occured");
});

app.get("/", (_, response) => response.redirect("/movie"));

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log("Server is listening to http://localhost:8080");
});
