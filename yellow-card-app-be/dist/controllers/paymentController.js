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
exports.submitPaymentRequest = exports.getChannels = void 0;
const paymentService_1 = require("../services/paymentService");
const getChannels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { direction } = req.query;
    try {
        const channels = yield (0, paymentService_1.fetchChannels)(direction);
        // Filter active channels and extract supported countries and payment methods
        const activeChannels = channels.filter((c) => c.status === "active");
        const supportedCountries = [
            ...new Set(activeChannels.map((c) => c.country)),
        ];
        const paymentMethods = [
            ...new Set(activeChannels.map((c) => c.channelType)),
        ];
        console.log("Supported Countries:", supportedCountries);
        console.log("Payment Methods:", paymentMethods);
        res.json({ channels, supportedCountries, paymentMethods });
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
exports.getChannels = getChannels;
const submitPaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const channels = yield (0, paymentService_1.fetchChannels)(null);
        const networks = yield (0, paymentService_1.fetchNetworks)();
        const rates = yield (0, paymentService_1.fetchRates)();
        const activeChannels = channels.filter((c) => c.status === "active" && c.rampType === "withdraw");
        const channel = activeChannels[0];
        if (!channel) {
            console.error("No active deposit channel found");
            return res.status(400).json({ error: "No active deposit channel found" });
        }
        const supportedNetworks = networks.filter((n) => n.status === "active" && n.channelIds.includes(channel.id));
        if (supportedNetworks.length === 0) {
            console.error("No supported networks found for the active channel");
            return res
                .status(400)
                .json({ error: "No supported networks found for the active channel" });
        }
        const network = supportedNetworks[0];
        const currency = rates.find((r) => r.code === "NGN");
        if (!currency) {
            console.error("Currency rate not found for NGN");
            return res.status(400).json({ error: "Currency rate not found for NGN" });
        }
        const amountLocal = 5000;
        const amountUSD = amountLocal / currency.buy; // Assuming currency.buy is the conversion rate
        const sender = {
            name: "Sample Name",
            country: "US",
            phone: "+12222222222",
            address: "Sample Address",
            dob: "10/d10d/2010",
            email: "email@domain.com",
            idNumber: "0123456789",
            idType: "license",
        };
        const destination = {
            accountName: "John Doe",
            accountNumber: "+12222222222",
            accountType: "momo",
            country: network.country,
            networkId: network.id,
            accountBank: network.code,
        };
        // Uncomment the below line in a real-world scenario to verify destination details
        const destinationConf = yield (0, paymentService_1.verifyDestination)(network, destination);
        destination.accountName = destinationConf.accountName;
        const request = {
            channelId: channel.id,
            sequenceId: "234567342679",
            // currency: channel.currency,
            // country: channel.country,
            // localAmount: amountLocal,
            amount: amountUSD,
            reason: "entertainment",
            destination,
            sender,
            // rampType: channel.rampType, // Use the rampType directly from the channel
        };
        // Stringify the request once and use it consistently
        // const requestBody = JSON.stringify(request);
        // console.log("Expected payload structure:", requestBody);
        // // Calculate the bodyHmac once
        // const hmac = crypto.createHmac("sha256", "your-secret-key"); // Replace 'your-secret-key' with your actual secret key
        // const bodyHmac = hmac.update(requestBody).digest("hex");
        // // Log the request body and bodyHmac once after calculation
        // console.log("req body:", requestBody);
        // console.log("bodyHmac:", bodyHmac);
        // // Add the calculated bodyHmac to the request headers
        // const headers = {
        //   "Content-Type": "application/json",
        //   bodyHmac: bodyHmac,
        // };
        const paymentResponse = yield (0, paymentService_1.submitPayment)(request);
        res.json(paymentResponse);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error submitting payment:", error.message);
            res.status(500).json({ error: error.message });
        }
        else {
            console.error("An unexpected error occurred");
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }
});
exports.submitPaymentRequest = submitPaymentRequest;
