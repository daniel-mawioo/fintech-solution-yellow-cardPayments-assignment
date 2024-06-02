import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:4000", // Allow only this origin
    methods: "GET,POST,PUT,DELETE", // Allow these methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/api", paymentRoutes);

export default app;
