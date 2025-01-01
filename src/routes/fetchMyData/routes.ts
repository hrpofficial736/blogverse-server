import { Router } from "express";
import { fetchMyDataControl } from "../../controllers/fetchMyData/controller";
import { authenticateToken } from "../../controllers/authenticateToken/controller";

const router = Router();

// @ts-ignore - There is a false warning for fetchMyDataControl handler below.
router.get("/fetchMyData/:username", authenticateToken, fetchMyDataControl);

export default router;
