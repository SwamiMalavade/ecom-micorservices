import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import authController from "../controllers/auth.controller.js";
import { registerRequestDto } from "../dto/auth/register.dto.js";
import { LoginRequestDto } from "../dto/auth/login.dto.js";
import authorize from "../middlewares/authorize.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerRequestDto), authController.register);

router.post("/login", validate(LoginRequestDto), authController.login);

export default router;
