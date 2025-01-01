import registerRoute from "../../routes/register/routes";
import loginRoute from "../../routes/login/routes";
import completeProfileRoute from "../../routes/completeProfile/routes";
import fetchMyDataRoute from "../../routes/fetchMyData/routes";
import fetchOtherUsersDataRoute from "../../routes/fetchOtherUserData/routes";
import addBlogRoute from "../../routes/addBlog/routes";
import fetchMyBlogs from "../../routes/fetchMyBlogs/routes";
import fetchUsersRoute from "../../routes/fetchUsers/routes";
import favoriteABlog from "../../routes/favoriteABlog/routes";
import unFavoriteABlog from "../../routes/unFavoriteABlog/routes";
import getFavoriteBlogs from "../../routes/getFavoriteBlogs/routes";
import updateProfile from "../../routes/updateProfile/routes";
import resetPasswordRoute from "../../routes/resetPassword/routes";
import logOutRoute from "../../routes/logOut/routes";
import refreshAccessTokenRoute from "../../routes/refreshAccessToken/routes";

export {
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
};
