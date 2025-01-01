"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../../controllers/unFavoriteABlog/controller"));
const controller_2 = require("../../controllers/authenticateToken/controller");
const router = (0, express_1.Router)();
// @ts-ignore: There is a false warning for the handler below.
router.put("/unfavoriteABlog", controller_2.authenticateToken, controller_1.default);
exports.default = router;
