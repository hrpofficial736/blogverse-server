import { Router } from "express";
import { completeProfileControl } from "../../controllers/completeProfile/controller";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import upload from "../../multer/multerConfig";

const router = Router();

router.put(
  "/completeProfile/:username/:type",
  // @ts-ignore - There is a false warning for updateProfileControl handler below.
  authenticateToken,
  upload.single("image"),
  completeProfileControl,
);

export default router;
