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
exports.fetchOtherUsersDataControl = fetchOtherUsersDataControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function fetchOtherUsersDataControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        try {
            const userExists = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
                include: {
                    blogs: true,
                },
            });
            if (!userExists) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found!",
                });
            }
            return res.status(200).json({
                username: userExists.username,
                name: userExists.name,
                image: userExists.image,
                email: userExists.email,
                country: userExists.country,
                profession: userExists.profession,
                description: userExists.description,
                blogs: userExists.blogs,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error!",
            });
        }
    });
}
