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
exports.submitPayment = exports.verifyDestination = exports.fetchRates = exports.fetchNetworks = exports.fetchChannels = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const httpAuth_1 = __importDefault(require("../utils/httpAuth"));
axios_1.default.defaults.baseURL = config_1.default.apiUrl;
axios_1.default.interceptors.request.use((config) => {
    var _a;
    const url = new URL(config.url || "", axios_1.default.defaults.baseURL);
    const apiPath = url.pathname;
    const { date, signature } = (0, httpAuth_1.default)(apiPath, ((_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || "", config.data);
    config.headers["Authorization"] = signature;
    config.headers["X-YC-Timestamp"] = date;
    if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});
const isAxiosError = (error) => {
    return error.isAxiosError !== undefined;
};
const fetchChannels = (direction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { data: { channels }, } = yield axios_1.default.get("/business/channels");
        if (direction != null) {
            const activeChannels = channels.filter((channel) => channel.status === "active" && channel.rampType === direction);
            return activeChannels;
        }
        return channels;
    }
    catch (error) {
        if (isAxiosError(error)) {
            const responseData = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            console.error("Error fetching channels:", responseData);
            throw new Error(responseData.message || "Error fetching channels");
        }
        else {
            console.error("Network error:", error.message);
            throw new Error("Network error");
        }
    }
});
exports.fetchChannels = fetchChannels;
const fetchNetworks = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const response = yield axios_1.default.get("/business/networks");
        return response.data.networks;
    }
    catch (error) {
        if (isAxiosError(error)) {
            const responseData = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            console.error("Error fetching networks:", responseData);
            throw new Error(responseData.message || "Error fetching networks");
        }
        else {
            console.error("Network error:", error.message);
            throw new Error("Network error");
        }
    }
});
exports.fetchNetworks = fetchNetworks;
const fetchRates = () => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const response = yield axios_1.default.get("/business/rates");
        return response.data.rates;
    }
    catch (error) {
        if (isAxiosError(error)) {
            const responseData = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data;
            console.error("Error fetching rates:", responseData);
            throw new Error(responseData.message || "Error fetching rates");
        }
        else {
            console.error("Network error:", error.message);
            throw new Error("Network error");
        }
    }
});
exports.fetchRates = fetchRates;
const verifyDestination = (network, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const response = yield axios_1.default.post(`/business/details/bank`, destination);
        return response.data;
    }
    catch (error) {
        if (isAxiosError(error)) {
            const responseData = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data;
            console.error("Error verifying destination:", responseData);
            throw new Error(responseData.message || "Error verifying destination");
        }
        else {
            console.error("Network error:", error.message);
            throw new Error("Network error");
        }
    }
});
exports.verifyDestination = verifyDestination;
const submitPayment = (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const response = yield axios_1.default.post("/business/payments", request);
        return response.data;
    }
    catch (error) {
        if (isAxiosError(error)) {
            const responseData = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data;
            console.error("Error submitting payment:", responseData);
            throw new Error(responseData.message || "Error submitting payment");
        }
        else {
            console.error("Network error:", error.message);
            throw new Error("Network error");
        }
    }
});
exports.submitPayment = submitPayment;
