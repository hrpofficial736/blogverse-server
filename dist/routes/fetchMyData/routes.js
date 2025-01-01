"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/fetchMyData/controller");
const controller_2 = require("../../controllers/authenticateToken/controller");
const router = (0, express_1.Router)();
// @ts-ignore - There is a false warning for fetchMyDataControl handler below.
router.get("/fetchMyData/:username", controller_2.authenticateToken, controller_1.fetchMyDataControl);
exports.default = router;
