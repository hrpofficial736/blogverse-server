"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginControl = loginControl;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
const controller_1 = require("../generateToken/controller");
function loginControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCredentials = req.body;
        try {
            const userExists = yield prisma_client_1.default.user.findFirst({
                where: {
                    email: userCredentials.email,
                },
            });
            if (userExists) {
                yield bcrypt_1.default.compare(userCredentials.password, userExists.password);
                const accessToken = (0, controller_1.generateAccessToken)({
                    userId: userExists.id,
                    userName: userExists.name,
                });
                const refreshToken = (0, controller_1.generateRefreshToken)({ userId: userExists.id });
                res
                    .status(200)
                    .cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                    .json({
                    message: "User is authenticated!",
                    token: accessToken,
                    username: userExists.username,
                    isProfileCompleted: userExists.image &&
                        userExists.country &&
                        userExists.profession &&
                        userExists.description,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                authenticated: false,
                error: "Internal server error",
            });
        }
    });
}
