"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("../config"));
const httpAuth = (path, method, body) => {
    const date = new Date().toISOString();
    const hmac = crypto_js_1.default.algo.HMAC.create(crypto_js_1.default.algo.SHA256, config_1.default.secret);
    hmac.update(date);
    hmac.update(path);
    hmac.update(method);
    if (body) {
        const bodyHmac = crypto_js_1.default
            .SHA256(JSON.stringify(body))
            .toString(crypto_js_1.default.enc.Base64);
        hmac.update(bodyHmac);
    }
    const hash = hmac.finalize();
    const signature = crypto_js_1.default.enc.Base64.stringify(hash);
    return {
        date,
        signature: `YcHmacV1 ${config_1.default.apiKey}:${signature}`,
    };
};
exports.default = httpAuth;
