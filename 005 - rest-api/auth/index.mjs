import { Router } from "express";
import { body } from "express-validator";

import { loginAction, registerAction } from "./controller.mjs";
import User from "./model.mjs";

const router = Router();

/**
 * @swagger
 * definitions:
 *  User:
 *    properties:
 *      id:
 *        type: string
 *        example: 507f1f77bcf86cd799439011
 *      username:
 *        type: string
 *        example: username
 *
 * /auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    requestBody:
 *      description: Optional description
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                example: username
 *              password:
 *                type: string
 *                example: Test@1234
 *    responses:
 *      201:
 *       description: User is created
 *      400:
 *        description: Validation error
 *      500:
 *        description: Internal server error
 *
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - username
 *                - password
 *              properties:
 *                username:
 *                  type: string
 *                  example: username
 *                password:
 *                  type: string
 *                  example: Test@1234
 *    responses:
 *      200:
 *        description: User is authenticated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  format: jwt
 *                  description: The JWT with which the user can authenticate themselves
 *                  readOnly: true
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGRkYmQ4ZTY3NTAzN2EyMTA0MzVmYyIsImlhdCI6MTcxODAxNzIwOSwiZXhwIjoxNzE4MDIwODA5fQ.TDu_whg666V6FhVOD0FbBkATs3IyShg1bPrONxtBkVc
 *      400:
 *        description: Validation error
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 */

router.post(
  "/register",
  [
    body("username", "Username is invalid")
      .notEmpty({ ignore_whitespace: true })
      .bail()
      .custom((value) =>
        User.findOne({ username: value }).then((user) => {
          if (user) throw "Username already exist";
        }),
      ),
    body("password", "Password is invalid")
      .notEmpty({ ignore_whitespace: true })
      .bail()
      .isStrongPassword()
      .withMessage("Password must be strong"),
  ],
  registerAction,
);
router.post(
  "/login",
  [
    body("username", "Username is invalid")
      .notEmpty({ ignore_whitespace: true })
      .isString(),
    body("password", "Password is invalid")
      .notEmpty({ ignore_whitespace: true })
      .isString(),
  ],
  loginAction,
);

export { router };
