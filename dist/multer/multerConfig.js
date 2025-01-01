"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mediaStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const uploadDirectory = req.params.type === "profilePhoto"
            ? path_1.default.join(process.cwd(), "uploads", "/", req.params.username, "/", "profilePhoto")
            : path_1.default.join(process.cwd(), "uploads", "/", req.params.username, "/", "blogImage");
        fs_1.default.mkdir(uploadDirectory, { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating directory:", err);
                return;
            }
            {
                req.params.type === "profilePhoto"
                    ? fs_1.default.readdir(uploadDirectory, (err, files) => {
                        if (err) {
                            console.error("Error reading directory:", err);
                            return;
                        }
                        if (files.length !== 0) {
                            const filePath = path_1.default.join(uploadDirectory, files[0]);
                            fs_1.default.rm(filePath, (err) => {
                                if (err) {
                                    console.error("Error deleting file:", err);
                                    return;
                                }
                                callback(null, uploadDirectory);
                            });
                        }
                        else {
                            callback(null, uploadDirectory);
                        }
                    })
                    : callback(null, uploadDirectory);
            }
        });
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: mediaStorage });
exports.default = upload;
