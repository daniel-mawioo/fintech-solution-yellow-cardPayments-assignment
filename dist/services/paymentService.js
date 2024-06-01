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
axios_1.default.defaults.baseURL = config_1.default.apiUrl;
const fetchChannels = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("/channels");
    return response.data.channels;
});
exports.fetchChannels = fetchChannels;
const fetchNetworks = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("/networks");
    return response.data.networks;
});
exports.fetchNetworks = fetchNetworks;
const fetchRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("/rates");
    return response.data.rates;
});
exports.fetchRates = fetchRates;
const verifyDestination = (network, destination) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(`/details/${network.accountNumberType}`, destination);
    return response.data;
});
exports.verifyDestination = verifyDestination;
const submitPayment = (request) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post("/payments", request);
    return response.data;
});
exports.submitPayment = submitPayment;
