import { Router } from "express";

import { formAction, listAction, removeAction } from "./controller.mjs";

const router = Router();

router.get("/", listAction);
router.get("/delete/:id", removeAction);
router.post("/form/:id?", formAction);

export { router };
