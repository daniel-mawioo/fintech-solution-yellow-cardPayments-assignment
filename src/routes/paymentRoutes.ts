import { Router } from "express";
import {
  submitPaymentRequest,
  getChannels,
} from "../controllers/paymentController";

const router = Router();

router.post("/submit-payment", submitPaymentRequest);
router.get("/channels", getChannels);

export default router;
