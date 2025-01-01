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
exports.default = updateProfileControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
function updateProfileControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const userUpdateData = req.body;
        const username = req.params.username;
        try {
            const userExists = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
            });
            if (!userExists) {
                return res.status(404).json({ message: "User not found!" });
            }
            yield prisma_client_1.default.user.update({
                where: {
                    username: username,
                },
                data: {
                    name: userUpdateData.name,
                    image: `/uploads/${username}/profilePhoto/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`,
                    country: userUpdateData.country,
                    profession: userUpdateData.profession,
                    description: userUpdateData.description,
                },
            });
            return res.status(201).json({
                username: username,
                message: "User updated successfully!",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Internal server error!",
            });
        }
    });
}
