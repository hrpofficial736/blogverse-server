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
exports.registerControl = registerControl;
const prisma_client_1 = __importDefault(require("../../prisma/client/prisma-client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function registerControl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userCredentials = req.body;
        try {
            const userExists = yield prisma_client_1.default.user.findFirst({
                where: {
                    email: userCredentials.email,
                },
            });
            if (userExists) {
                return res.status(400).json({
                    status: 400,
                    message: "User with this email already exists.",
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(userCredentials.password, 10);
            const username = userCredentials.email.split("@")[0];
            yield prisma_client_1.default.user.create({
                data: {
                    name: userCredentials.name,
                    email: userCredentials.email,
                    password: hashedPassword,
                    username: username,
                },
            });
            res.status(201).json({
                status: 201,
                message: "User created successfully!",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
    });
}
