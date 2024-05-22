import { Router } from "express";

import {
  createAction,
  deleteAction,
  detailAction,
  listAction,
  updateAction,
} from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/:id", detailAction);
router.post("/", createAction);
router.patch("/:id", updateAction);
router.delete("/:id", deleteAction);

export { router };
