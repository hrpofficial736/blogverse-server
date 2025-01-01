import { Router } from "express";
import upload from "../../multer/multerConfig";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import addBlog from "../../controllers/addBlog/controller";

const router: Router = Router();
router.post(
  "/add-blog/:username/:type",
  // @ts-ignore : There is a false warning for the middleware below.
  authenticateToken,
  upload.single("coverImage"),
  addBlog,
);

export default router;
