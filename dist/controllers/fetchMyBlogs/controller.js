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
exports.default = fetchMyBlogsControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function fetchMyBlogsControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        try {
            const findUser = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
                include: {
                    blogs: true,
                },
            });
            if (!findUser) {
                return res.status(404).json({ message: "User not found!" });
            }
            return res
                .status(200)
                .json({ message: "Fetched blogs successfully!", data: findUser.blogs });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
