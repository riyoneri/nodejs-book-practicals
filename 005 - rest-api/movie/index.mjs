import { Router } from "express";

import { createAction, detailAction, listAction } from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/:id", detailAction);
router.post("/", createAction);

export { router };
