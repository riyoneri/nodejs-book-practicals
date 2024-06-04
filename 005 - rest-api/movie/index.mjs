import { Router } from "express";
import { body, param } from "express-validator";

import {
  createAction,
  deleteAction,
  detailAction,
  listAction,
  updateAction,
} from "./controller.mjs";

const router = Router();

/**
 * @swagger
 * definitions:
 *  Movie:
 *    properties:
 *      id:
 *        type: integer
 *        example: 1
 *      title:
 *        type: string
 *        example: Iron Man
 *      year:
 *        type: integer
 *        example: 2008
 *      public:
 *        type: boolean
 *        example: false
 *      user:
 *        type: string
 *        example: "507f1f77bcf86cd799439011"
 */

/**
 * @swagger
 * /movie:
 *  get:
 *    tags:
 *      - Movies
 *    description: Returns all movies
 *    responses:
 *      200:
 *        description: An array of datasets
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Movie'
 *      500:
 *        description: Internal server error
 */
router.get("/", listAction);

/**
 * @swagger
 * /movie/{movieId}:
 *  get:
 *    tags:
 *      - Movies
 *    description: Returns one movie
 *    responses:
 *      200:
 *        description: One movie object
 *        schema:
 *          $ref: '#/definitions/Movie'
 *      400:
 *        description: Movie id is misconfigured
 *      500:
 *        description: Internal server error
 */
router.get(
  "/:id",
  param("id", "Movie id is misconfigured").isMongoId(),
  detailAction,
);

/**
 * @swagger
 * /movie:
 *  post:
 *    tags:
 *      - Movies
 *    description: Create a movie
 *    requestBody:
 *      required: true
 *    content:
 *      apllication/json:
 */
router.post(
  "/",
  [
    body("title", "Title must be string")
      .isString()
      .isLength({ min: 1, max: 20 })
      .withMessage("Title has to be between 1 and 20"),
    body("year", "Year is invalid").isInt(),
    body("public", "Public property is invalid")
      .isInt()
      .isIn([0, 1])
      .withMessage("Public property must be 1 or 0"),
  ],
  createAction,
);
router.patch(
  "/:id",
  param("id", "Movie id is misconfigured").isMongoId(),
  updateAction,
);
router.delete(
  "/:id",
  param("id", "Movie id is misconfigured").isMongoId(),
  deleteAction,
);

export { router };
