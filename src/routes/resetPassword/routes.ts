import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import resetPasswordControl from "../../controllers/resetPassword/controller";

const router = Router();
// @ts-ignore: There is a false warning for the handler below.
router.use("/resetPassword/:username", authenticateToken, resetPasswordControl);

export default router;
