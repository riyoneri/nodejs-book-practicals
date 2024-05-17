import { Router } from "express";

import { listAction, removeAction } from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/delete/:id", removeAction);

export { router };
