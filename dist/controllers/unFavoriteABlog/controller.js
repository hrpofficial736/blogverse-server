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
exports.default = unFavoriteABlogControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function unFavoriteABlogControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const blogId = req.body.blogId;
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
                return res.status(404).json({ message: "No user found" });
            yield prisma_client_1.default.user.update({
                where: {
                    username: username,
                },
                data: {
                    favorites: {
                        disconnect: { id: blogId },
                    },
                },
            });
            yield prisma_client_1.default.blog.update({
                where: {
                    id: blogId,
                },
                data: {
                    favoritedBy: {
                        disconnect: { id: user.id },
                    },
                },
            });
            return res.status(201).json({ message: "Blog removed from favorites" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
