import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { createHash } from "node:crypto";

import customValidationResult from "../helpers/custom-validation.mjs";
import User from "./model.mjs";

export const registerAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });
    const newUser = new User({
      username: request.body.username,
      password: createHash("md5").update(request.body.password).digest("hex"),
    });

    const savedUser = await newUser.save();

    response.status(201).json(savedUser.format());
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};

export const loginAction = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response
        .status(400)
        .json({ errors: customValidationResult(request) });

    const user = await User.findOne({
      username: request.body.username,
      password: createHash("md5").update(request.body.password).digest("hex"),
    });

    if (!user) return response.status(401).json("Unauthorized");

    const token = jwt.sign({ id: user.format().id }, "secret", {
      expiresIn: "1h",
    });

    response.json({ token });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    response.status(500).send("An error occured");
  }
};
