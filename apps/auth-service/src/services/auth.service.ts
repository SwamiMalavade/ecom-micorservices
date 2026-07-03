import { RegisterRequestDto } from "../dto/auth/register.dto.js";
import AppError from "../errors/AppError.js";
import bcrypt from "bcrypt";
import userRespository from "../repositories/user.respository.js";
import { LoginRequestDto } from "../dto/auth/login.dto.js";
import { comparePassword, generateToken } from "../utils/jwt.js";

class AuthService {
  async register(data: RegisterRequestDto) {
    const { email, password } = data;
    const existingUser = await userRespository.findByEmail(email);

    if (existingUser) {
      throw new AppError(409, "EMAIL_ALREADY_EXISTS", "Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    const createdUser = await userRespository.create(user);

    const newUser = {
      name: createdUser.name,
      email: createdUser.email,
    };
    return newUser;
  }

  async login(data: LoginRequestDto) {
    const existingUser = await userRespository.findByEmail(data.email);

    if (!existingUser) {
      throw new AppError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password",
      );
    }

    const isPasswordValid = await comparePassword(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new AppError(
        401,
        "INVALID_CREDENTIALS",
        "Invalid email or password",
      );
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
      isVerified: existingUser.isVerified,
    };

    const accessToken = generateToken(payload);
    return accessToken;
  }
}
export default new AuthService();
