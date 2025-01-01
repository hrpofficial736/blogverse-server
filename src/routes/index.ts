import { Router } from "express";
import {
  loginRoute,
  registerRoute,
  completeProfileRoute,
  fetchMyDataRoute,
  fetchOtherUsersDataRoute,
  addBlogRoute,
  fetchMyBlogs,
  fetchUsersRoute,
  favoriteABlog,
  unFavoriteABlog,
  getFavoriteBlogs,
  updateProfile,
  resetPasswordRoute,
  logOutRoute,
  refreshAccessTokenRoute,
} from "../exports/routes/export";

const router = Router();

router.use(loginRoute);
router.use(registerRoute);
router.use(completeProfileRoute);
router.use(fetchMyDataRoute);
router.use(fetchOtherUsersDataRoute);
router.use(addBlogRoute);
router.use(fetchMyBlogs);
router.use(fetchUsersRoute);
router.use(favoriteABlog);
router.use(unFavoriteABlog);
router.use(getFavoriteBlogs);
router.use(updateProfile);
router.use(resetPasswordRoute);
router.use(logOutRoute);
router.use(refreshAccessTokenRoute);

export default router;
