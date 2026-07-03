import { NextFunction, Request, Response } from "express";
import { RegisterRequestDto } from "../dto/auth/register.dto.js";
import authService from "../services/auth.service.js";
import { LoginRequestDto } from "../dto/auth/login.dto.js";

class AuthController {
  async register(
    req: Request<{}, {}, RegisterRequestDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await authService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request<{}, {}, LoginRequestDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = await authService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful",
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
