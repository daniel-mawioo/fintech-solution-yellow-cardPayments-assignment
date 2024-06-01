import express from "express";
import bodyParser from "body-parser";
import paymentRoutes from "./routes/paymentRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/api", paymentRoutes);

export default app;
