"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/fetchOtherUserData/controller");
const controller_2 = require("../../controllers/authenticateToken/controller");
const router = (0, express_1.Router)();
router.get("/fetchData/:username", 
// @ts-ignore - There is a false warning for updateProfileControl handler below.
controller_2.authenticateToken, controller_1.fetchOtherUsersDataControl);
exports.default = router;
