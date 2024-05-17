import { Router } from "express";

import {
  formAction,
  listAction,
  removeAction,
  saveAction,
} from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/delete/:id", removeAction);
router.post("/form/:id?", formAction);
router.post("/save", saveAction);

export { router };
