import { Router } from "express";

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
 *      - movies
 *    description: Returns all movies
 *    responses:
 *      200:
 *        description: An array of datasets
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/Movie'
 */
router.get("/", listAction);

/**
 * @swagger
 * /movie/{movieId}:
 *  get:
 *    tags:
 *      - movies
 *    description: REturns one movie
 *    responses:
 *      200:
 *        description: One movie object
 *        schema:
 *          $ref: '#/definitions/Movie'
 */
router.get("/:id", detailAction);
router.post("/", createAction);
router.patch("/:id", updateAction);
router.delete("/:id", deleteAction);

export { router };
