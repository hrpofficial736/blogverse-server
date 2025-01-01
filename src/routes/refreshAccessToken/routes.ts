import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import refreshAccessTokenControl from "../../controllers/refreshAccessToken/controller";

const router = Router();

// @ts-ignore: There is a false warning for the handler below.
router.get("/refreshToken", refreshAccessTokenControl);

export default router;
