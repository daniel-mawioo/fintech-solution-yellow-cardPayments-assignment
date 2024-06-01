import { Request, Response } from "express";
import {
  fetchChannels,
  fetchNetworks,
  fetchRates,
  verifyDestination,
  submitPayment,
} from "../services/paymentService";
import { Destination, Sender } from "../types";

export const getChannels = async (req: Request, res: Response) => {
  try {
    const channels = await fetchChannels();
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
    const channels = await fetchChannels();
    const networks = await fetchNetworks();
    const rates = await fetchRates();

    const activeChannels = channels.filter((c: any) => c.status === "active");
    const channel = activeChannels[1];
    const supportedNetworks = networks.filter(
      (n: any) => n.status === "active" && n.channelIds.includes(channel.id)
    );
    const network = supportedNetworks[0];
    const currency = rates.find((r: any) => r.code === "NGN");
    const amountLocal = 500;
    const amountUSD = amountLocal * currency.buy;

    const sender: Sender = {
      name: "Sample Name",
      country: "US",
      phone: "+12222222222",
      address: "Sample Address",
      dob: "mm/dd/yyyy",
      email: "email@domain.com",
      idNumber: "0123456789",
      idType: "license",
    };

    const destination: Destination = {
      accountNumber: "0690000040",
      accountType: network.accountNumberType,
      country: network.country,
      networkId: network.id,
      accountBank: network.code,
    };

    const destinationConf = await verifyDestination(network, destination);
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

    const paymentResponse = await submitPayment(request);
    res.json(paymentResponse);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
