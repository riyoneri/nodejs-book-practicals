import { Router } from "express";

import { registerAction } from "./controller.mjs";

const router = Router();

router.post("/register", registerAction);

export { router };
