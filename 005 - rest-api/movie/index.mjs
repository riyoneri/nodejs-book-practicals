import { Router } from "express";

import {
  createAction,
  detailAction,
  listAction,
  updateAction,
} from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/:id", detailAction);
router.post("/", createAction);
router.patch("/:id", updateAction);

export { router };
