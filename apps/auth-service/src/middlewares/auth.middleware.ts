import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import AppError from "../errors/AppError.js";
import userRespository from "../repositories/user.respository.js";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        401,
        "UNAUTHORIZED",
        "Authorization header is missing",
      );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer") {
      throw new AppError(401, "UNAUTHORIZED", "Invalid format");
    }

    const payload = verifyToken(token);
    const existingUser = await userRespository.findByUserId(payload.id);

    if (!existingUser) {
      throw new AppError(401, "UNAUTHORIZED", "User not found");
    }

    req.user = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      isVerified: existingUser.isVerified,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
