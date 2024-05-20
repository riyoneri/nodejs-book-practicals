import { Router } from "express";

import { detailAction, listAction } from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/:id", detailAction);

export { router };
