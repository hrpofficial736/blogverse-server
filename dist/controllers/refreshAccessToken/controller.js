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
exports.default = refreshAccessTokenControl;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const controller_1 = require("../generateToken/controller");
function refreshAccessTokenControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const refreshTokenFromCookie = req.cookies.refreshToken;
            if (!refreshTokenFromCookie)
                return res.status(404).json({ message: "Refresh token missing!" });
            const decoded = jsonwebtoken_1.default.verify(refreshTokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
            if (typeof decoded === "string") {
                throw new Error("Invalid refresh token payload");
            }
            const { userId } = decoded;
            if (!userId)
                throw new Error("UserId not found in the payload!");
            const newAccessToken = (0, controller_1.generateAccessToken)({ userId: decoded.userId });
            return res.status(200).json({
                message: "Generated new access token",
                newAccessToken,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
