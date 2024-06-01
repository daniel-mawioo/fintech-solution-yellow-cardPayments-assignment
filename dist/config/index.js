"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    apiUrl: process.env.API_URL || "",
    apiKey: process.env.API_KEY || "",
    secret: process.env.SECRET || "",
    port: process.env.PORT || 3000,
};
