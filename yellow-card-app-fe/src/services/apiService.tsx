import axios, { AxiosError } from "axios";

// Set the base URL for the API
const API_BASE_URL = "http://localhost:4000/api";

axios.defaults.baseURL = API_BASE_URL;

// Helper function to check if an error is an AxiosError
const isAxiosError = (error: any): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

// Function to fetch channels
export const fetchChannels = async (direction: string | null) => {
  try {
    const response = await axios.get("/channels", {
      params: { direction },
    });

    // Return the channels data from the response
    return response.data;
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

export const fetchPaymentReasons = async (): Promise<string[]> => {
  try {
    const response = await axios.get("/payment-reasons");
    return response.data.paymentReasons;
  } catch (error) {
    if (isAxiosError(error)) {
      const responseData = error.response?.data as { message?: string };
      console.error("Error fetching payment reasons:", responseData);
      throw new Error(responseData.message || "Error fetching payment reasons");
    } else {
      console.error("Network error:", (error as Error).message);
      throw new Error("Network error");
    }
  }
};
