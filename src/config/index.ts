import dotenv from "dotenv";

dotenv.config();

export default {
  apiUrl: process.env.API_URL || "",
  apiKey: process.env.API_KEY || "",
  secret: process.env.SECRET || "",
  port: process.env.PORT || 3000,
};
