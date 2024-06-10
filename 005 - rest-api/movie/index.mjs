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
 *        example: 507f1f77bcf86cd799439012
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
 *
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *
 * security:
 *  - bearerAuth: []
 */

/**
 * @swagger
 * /movie:
 *  get:
 *    security:
 *      - bearerAuth: []
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
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
router.get("/", listAction);

/**
 * @swagger
 * /movie/{movieId}:
 *  parameters:
 *    - in: path
 *      name: movieId
 *      required: true
 *      schema:
 *        type: string
 *
 *  get:
 *    security:
 *      - bearerAuth: []
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
 *      404:
 *        description: Movie not found
 *      401:
 *        description: Unauthorized
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
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Movies
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - year
 *              - public
 *            properties:
 *              title:
 *                type: string
 *                example: Iron Man
 *              year:
 *                type: number
 *                example: 2009
 *              public:
 *                type: integer
 *                example: 1
 *    responses:
 *      201:
 *        description: Movie is created
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
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

/**
 * @swagger
 * /movie/${movieId}:
 *  parameters:
 *    - in: path
 *      name: movieId
 *      required: true
 *      schema:
 *        type: string
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Movies
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: movie
 *        description: The movie to update
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: Captain America
 *            year:
 *              type: number
 *              example: 2009
 *            public:
 *              type: boolean
 *              example: true
 *    responses:
 *      200:
 *        description: Movie is updated
 *      404:
 *        description: Movie not found
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
router.patch(
  "/:id",
  param("id", "Movie id is misconfigured").isMongoId(),
  updateAction,
);

/**
 * @swagger
 * /movie/${movieId}:
 *  parameters:
 *    - in: path
 *      name: movieId
 *      required: true
 *      schema:
 *        type: string
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *      - Movies
 *    description: Delete a movie
 *    responses:
 *      204:
 *        description: Movie is deleted
 *      404:
 *        description: Movie not found
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */
router.delete(
  "/:id",
  param("id", "Movie id is misconfigured").isMongoId(),
  deleteAction,
);

export { router };
