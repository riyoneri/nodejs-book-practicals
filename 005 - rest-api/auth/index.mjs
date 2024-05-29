import { Router } from "express";
import { body } from "express-validator";

import { loginAction, registerAction } from "./controller.mjs";
import User from "./model.mjs";

const router = Router();

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
