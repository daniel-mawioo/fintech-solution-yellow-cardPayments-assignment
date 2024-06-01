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
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitPaymentRequest = void 0;
const paymentService_1 = require("../services/paymentService");
const submitPaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield (0, paymentService_1.fetchChannels)();
        const networks = yield (0, paymentService_1.fetchNetworks)();
        const rates = yield (0, paymentService_1.fetchRates)();
        const activeChannels = channels.filter((c) => c.status === "active");
        const channel = activeChannels[1];
        const supportedNetworks = networks.filter((n) => n.status === "active" && n.channelIds.includes(channel.id));
        const network = supportedNetworks[0];
        const currency = rates.find((r) => r.code === "NGN");
        const amountLocal = 500;
        const amountUSD = amountLocal * currency.buy;
        const sender = {
            name: "Sample Name",
            country: "US",
            phone: "+12222222222",
            address: "Sample Address",
            dob: "mm/dd/yyyy",
            email: "email@domain.com",
            idNumber: "0123456789",
            idType: "license",
        };
        const destination = {
            accountNumber: "0690000040",
            accountType: network.accountNumberType,
            country: network.country,
            networkId: network.id,
            accountBank: network.code,
        };
        const destinationConf = yield (0, paymentService_1.verifyDestination)(network, destination);
        destination.accountName = destinationConf.accountName;
        const request = {
            channelId: channel.id,
            currency: channel.currency,
            country: channel.country,
            amountUSD,
            reason: "entertainment",
            destination,
            sender,
        };
        const paymentResponse = yield (0, paymentService_1.submitPayment)(request);
        res.json(paymentResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.submitPaymentRequest = submitPaymentRequest;
