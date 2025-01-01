import { Router } from "express";
import getFavoriteBlogsControl from "../../controllers/getFavoriteBlogs/controller";
import { authenticateToken } from "../../controllers/authenticateToken/controller";

const router = Router();

router.get(
  "/getFavoriteBlogs/:username",
  // @ts-ignore: There is a false warning for the handler below.
  authenticateToken,
  getFavoriteBlogsControl,
);

export default router;
