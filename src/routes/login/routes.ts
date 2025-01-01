import { Router } from "express";
import { loginControl } from "../../controllers/login/controller";

const router = Router();

// @ts-ignore
router.post("/login", loginControl);

export default router;
