"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerConfig_1 = __importDefault(require("../../multer/multerConfig"));
const controller_1 = require("../../controllers/authenticateToken/controller");
const controller_2 = __importDefault(require("../../controllers/addBlog/controller"));
const router = (0, express_1.Router)();
router.post("/add-blog/:username/:type", 
// @ts-ignore : There is a false warning for the middleware below.
controller_1.authenticateToken, multerConfig_1.default.single("coverImage"), controller_2.default);
exports.default = router;
