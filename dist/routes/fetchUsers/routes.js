"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../../controllers/authenticateToken/controller");
const controller_2 = __importDefault(require("../../controllers/fetchUsers/controller"));
const router = (0, express_1.Router)();
// @ts-ignore : There is a false warning for the handler below.
router.get("/fetchUsers/:input", controller_1.authenticateToken, controller_2.default);
exports.default = router;
