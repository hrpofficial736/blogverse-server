import { Router } from "express";
import { registerControl } from "../../controllers/register/controller";

const router = Router();

// @ts-ignore - There is a false warning for registerControl handler below.
router.post("/register", registerControl);

export default router;
