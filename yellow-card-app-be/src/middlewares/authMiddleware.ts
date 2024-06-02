import { Request, Response, NextFunction } from "express";
import httpAuth from "../utils/httpAuth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiPath = req.path.replace("/api", ""); // Adjust the path for the API endpoint
  const { signature, date } = httpAuth(
    apiPath,
    req.method.toUpperCase(),
    req.body
  );
  req.headers["Authorization"] = signature;
  req.headers["X-YC-Timestamp"] = date;
  next();
};
