"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const httpAuth_1 = __importDefault(require("../utils/httpAuth"));
const authMiddleware = (req, res, next) => {
    const apiPath = req.path.replace("/api", ""); // Adjust the path for the API endpoint
    const { signature, date } = (0, httpAuth_1.default)(apiPath, req.method.toUpperCase(), req.body);
    req.headers["Authorization"] = signature;
    req.headers["X-YC-Timestamp"] = date;
    next();
};
exports.authMiddleware = authMiddleware;
