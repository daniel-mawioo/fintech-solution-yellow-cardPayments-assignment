"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(authMiddleware_1.authMiddleware);
app.use("/api", paymentRoutes_1.default);
exports.default = app;