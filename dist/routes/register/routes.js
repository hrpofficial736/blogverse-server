"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/register/controller");
const router = (0, express_1.Router)();
// @ts-ignore - There is a false warning for registerControl handler below.
router.post("/register", controller_1.registerControl);
exports.default = router;
