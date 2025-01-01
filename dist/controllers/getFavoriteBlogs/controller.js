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
exports.default = getFavoriteBlogsControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function getFavoriteBlogsControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username.split(":")[1];
        try {
            const user = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
                include: {
                    favorites: true,
                },
            });
            if (!user)
                return res.status(404).json({
                    message: "Either user not found or there are no blogs for this user!",
                });
            return res.status(201).json({
                favoriteBlogs: user.favorites,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
