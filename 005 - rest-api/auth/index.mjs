import { Router } from "express";

import { loginAction, registerAction } from "./controller.mjs";

const router = Router();

router.post("/register", registerAction);
router.post("/login", loginAction);

export { router };
