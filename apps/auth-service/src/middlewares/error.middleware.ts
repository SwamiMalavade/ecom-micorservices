import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js";
import logger from "../logger/logger.js";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Log the error for developers
  logger.error(err.stack || err.message);

  // Handle our custom errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
