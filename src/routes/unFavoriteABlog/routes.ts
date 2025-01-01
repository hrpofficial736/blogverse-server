import { Router } from "express";
import unFavoriteABlogControl from "../../controllers/unFavoriteABlog/controller";
import { authenticateToken } from "../../controllers/authenticateToken/controller";

const router = Router();

// @ts-ignore: There is a false warning for the handler below.
router.put("/unfavoriteABlog", authenticateToken, unFavoriteABlogControl);

export default router;
