"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.post("/submit-payment", paymentController_1.submitPaymentRequest);
router.get("/channels", paymentController_1.getChannels);
exports.default = router;
