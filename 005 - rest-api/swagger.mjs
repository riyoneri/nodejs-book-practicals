import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Movie Database API",
    version: "1.0.0",
    description: "API of the movie database",
  },
  host: "localhost:8080",
  basePath: "/",
};
const options = {
  swaggerDefinition,
  apis: ["./movie/index.mjs", "./auth/index.mjs"],
};
export default swaggerJSDoc(options);
