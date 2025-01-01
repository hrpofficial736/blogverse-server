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
exports.default = resetPasswordControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function resetPasswordControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.params.username;
        const { oldPassword, newPassword } = req.body;
        try {
            const user = yield prisma_client_1.default.user.findFirst({
                where: {
                    username: username,
                },
            });
            if (!user)
                return res.status(404).json({ message: "User not found!" });
            const hash = yield bcrypt_1.default.hash(newPassword, 10);
            const checkForOldPassword = yield bcrypt_1.default.compare(oldPassword, user.password);
            if (checkForOldPassword) {
                yield prisma_client_1.default.user.update({
                    where: {
                        username: username,
                    },
                    data: {
                        password: hash,
                    },
                });
                return res
                    .status(202)
                    .json({ message: "Password updated successfully!" });
            }
            return res.status(400).json({ message: "Wrong Password" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    });
}
