import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js";

const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, "UNAUTHORIZED", "Authentication required");
    }

    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
      throw new AppError(403, "FORBIDDEN", "Access denied");
    }
    next();
  };
};

export default authorize;
