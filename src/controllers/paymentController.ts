import { Request, Response } from "express";
import {
  fetchChannels,
  fetchNetworks,
  fetchRates,
  verifyDestination,
  submitPayment,
} from "../services/paymentService";
import { Destination, Sender } from "../types";
import crypto from "crypto";

export const getChannels = async (req: Request, res: Response) => {
  const { direction } = req.query;
  try {
    const channels = await fetchChannels(direction);
    res.json(channels);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const submitPaymentRequest = async (req: Request, res: Response) => {
  try {
    const channels = await fetchChannels(null);
    const networks = await fetchNetworks();
    const rates = await fetchRates();

    const activeChannels = channels.filter(
      (c: any) => c.status === "active" && c.rampType === "withdraw"
    );
    const channel = activeChannels[0];

    if (!channel) {
      console.error("No active deposit channel found");
      return res.status(400).json({ error: "No active deposit channel found" });
    }

    const supportedNetworks = networks.filter(
      (n: any) => n.status === "active" && n.channelIds.includes(channel.id)
    );

    if (supportedNetworks.length === 0) {
      console.error("No supported networks found for the active channel");
      return res
        .status(400)
        .json({ error: "No supported networks found for the active channel" });
    }

    const network = supportedNetworks[0];

    const currency = rates.find((r: any) => r.code === "NGN");
    if (!currency) {
      console.error("Currency rate not found for NGN");
      return res.status(400).json({ error: "Currency rate not found for NGN" });
    }

    const amountLocal = 5000;
    const amountUSD = amountLocal / currency.buy; // Assuming currency.buy is the conversion rate

    const sender: Sender = {
      name: "Sample Name",
      country: "US",
      phone: "+12222222222",
      address: "Sample Address",
      dob: "10/d10d/2010",
      email: "email@domain.com",
      idNumber: "0123456789",
      idType: "license",
    };

    const destination: Destination = {
      accountName: "John Doe",
      accountNumber: "+12222222222",
      accountType: "momo",
      country: network.country,
      networkId: network.id,
      accountBank: network.code,
    };

    // Uncomment the below line in a real-world scenario to verify destination details
    const destinationConf = await verifyDestination(network, destination);
    destination.accountName = destinationConf.accountName;

    const request = {
      channelId: channel.id,
      sequenceId: "234567345679",
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

    const paymentResponse = await submitPayment(request);
    res.json(paymentResponse);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting payment:", error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error("An unexpected error occurred");
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
