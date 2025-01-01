import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import updateProfileControl from "../../controllers/updateProfile/controller";
import upload from "../../multer/multerConfig";

const router = Router();

router.put(
  "/updateProfile/:username/:type",
  // @ts-ignore: There is a false warning for the handler below.
  authenticateToken,
  upload.single("image"),
  updateProfileControl,
);

export default router;
