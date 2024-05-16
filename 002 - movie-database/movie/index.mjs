import { Router } from "express";

import { listAction } from "./controller.mjs";

const router = Router();

router.get("/", listAction);

export { router };
