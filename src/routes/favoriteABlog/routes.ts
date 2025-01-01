import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import favoriteABlogControl from "../../controllers/favoriteABlog/controller";

const router = Router();
// @ts-ignore : There is a false warning for the handler below.
router.put("/favoriteABlog", authenticateToken, favoriteABlogControl);

export default router;
