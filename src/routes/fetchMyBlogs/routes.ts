import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import fetchMyBlogsControl from "../../controllers/fetchMyBlogs/controller";

const router: Router = Router();
// @ts-ignore : There is a false warning for the handler below.
router.get("/fetchBlogs/:username", authenticateToken, fetchMyBlogsControl);

export default router;
