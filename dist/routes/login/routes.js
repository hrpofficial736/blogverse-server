"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/login/controller");
const router = (0, express_1.Router)();
// @ts-ignore
router.post("/login", controller_1.loginControl);
exports.default = router;
