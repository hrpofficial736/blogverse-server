import { Router } from "express";
import { authenticateToken } from "../../controllers/authenticateToken/controller";
import fetchUsersControl from "../../controllers/fetchUsers/controller";

const router = Router();
// @ts-ignore : There is a false warning for the handler below.
router.get("/fetchUsers/:input", authenticateToken, fetchUsersControl);

export default router;
