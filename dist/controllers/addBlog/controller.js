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
exports.default = addBlog;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function addBlog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const username = req.params.username;
        const blog = req.body;
        try {
            const user = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
            });
            const addBlog = yield prisma_client_1.default.blog.create({
                data: {
                    title: blog.title,
                    blogDescription: blog.blogDescription,
                    category: blog.category,
                    authorName: user === null || user === void 0 ? void 0 : user.name,
                    coverImage: `/uploads/${username}/blogImage/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
                    authorId: user === null || user === void 0 ? void 0 : user.id,
                },
            });
            yield prisma_client_1.default.user.update({
                where: {
                    username: username,
                },
                data: {
                    blogs: {
                        connect: { id: addBlog.id },
                    },
                },
            });
            return res.status(200).json({ message: "Blog Uploaded Successfully!" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
