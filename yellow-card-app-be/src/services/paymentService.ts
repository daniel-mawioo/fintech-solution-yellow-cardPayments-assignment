import axios, { AxiosError } from "axios";
import config from "../config";
import { Channel, Destination, DestinationResponse } from "../types";
import httpAuth from "../utils/httpAuth";

axios.defaults.baseURL = config.apiUrl;

axios.interceptors.request.use(
  (config) => {
    const url = new URL(config.url || "", axios.defaults.baseURL);
    const apiPath = url.pathname;
    const { date, signature } = httpAuth(
      apiPath,
      config.method?.toUpperCase() || "",
      config.data
    );
    config.headers["Authorization"] = signature;
    config.headers["X-YC-Timestamp"] = date;
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const isAxiosError = (error: any): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const fetchChannels = async (direction: any) => {
  try {
    const {
      data: { channels },
    } = await axios.get("/business/channels");

    if (direction != null) {
      const activeChannels = channels.filter(
        (channel: Channel) =>
          channel.status === "active" && channel.rampType === direction
      );

      return activeChannels;
    }

    return channels;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error fetching channels:", responseData);
      throw new Error(responseData.message || "Error fetching channels");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};

export const fetchNetworks = async () => {
  try {
    const response = await axios.get("/business/networks");
    return response.data.networks;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error fetching networks:", responseData);
      throw new Error(responseData.message || "Error fetching networks");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};

export const fetchRates = async () => {
  try {
    const response = await axios.get("/business/rates");
    return response.data.rates;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error fetching rates:", responseData);
      throw new Error(responseData.message || "Error fetching rates");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};

export const verifyDestination = async (
  network: any,
  destination: Destination
): Promise<DestinationResponse> => {
  try {
    const response = await axios.post(`/business/details/bank`, destination);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error verifying destination:", responseData);
      throw new Error(responseData.message || "Error verifying destination");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};

export const submitPayment = async (request: any) => {
  try {
    const response = await axios.post("/business/payments", request);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error submitting payment:", responseData);
      throw new Error(responseData.message || "Error submitting payment");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};

