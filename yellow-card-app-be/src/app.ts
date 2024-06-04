import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://jellyfish-app-j7l4t.ondigitalocean.app",
      "https://fintech-solution-yellow-card-payments-assignment.vercel.app",
    ], // Allow these origins
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Allow these methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

// Handle preflight requests explicitly
app.options("*", cors());

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/api", paymentRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
