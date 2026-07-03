import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { env } from "../config/env.js";
import AppError from "../errors/AppError.js";

export type JwtPayload = {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
};

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    return decoded as JwtPayload;
  } catch {
    throw new AppError(401, "INVALID_TOKEN", "Invalid or expired token");
  }
};
