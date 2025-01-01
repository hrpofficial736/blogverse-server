"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/completeProfile/controller");
const controller_2 = require("../../controllers/authenticateToken/controller");
const multerConfig_1 = __importDefault(require("../../multer/multerConfig"));
const router = (0, express_1.Router)();
router.put("/completeProfile/:username/:type", 
// @ts-ignore - There is a false warning for updateProfileControl handler below.
controller_2.authenticateToken, multerConfig_1.default.single("image"), controller_1.completeProfileControl);
exports.default = router;
