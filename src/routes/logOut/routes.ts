import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import logOutControl from "../../controllers/logOut/controller";

const router = Router();

// @ts-ignore: There is a false warning for the handler below.
router.delete("/logOut", authenticateToken, logOutControl);

export default router;
