import { Router } from "express";
import { fetchOtherUsersDataControl } from "../../controllers/fetchOtherUserData/controller";
import { authenticateToken } from "../../controllers/authenticateToken/controller";

const router = Router();

router.get(
  "/fetchData/:username",
  // @ts-ignore - There is a false warning for updateProfileControl handler below.
  authenticateToken,
  fetchOtherUsersDataControl,
);

export default router;
