import mongoose from "mongoose";
import AppError from "../errors/AppError.js";
import userRespository from "../repositories/user.respository.js";
import { log } from "node:console";
import { UpdateUserDto } from "../dto/auth/updateUser.dto.js";
import { ChangePasswordDto } from "../dto/auth/changePassword.dto.js";
import { comparePassword } from "../utils/jwt.js";
import { hashPassword } from "../utils/password.js";

class UserService {
  async findAll() {
    const users = await userRespository.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    }));
  }

  async findUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "INVALID_ID", "Invalid user id");
    }
    const user = await userRespository.findByUserId(id);

    if (!user) {
      throw new AppError(400, "USER_NOT_FOUND", "User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  }

  async updateUser(id: string, data: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "INVALID_ID", "Invalid user id");
    }

    const udpatedUser = await userRespository.updateUser(id, data);

    if (!udpatedUser) {
      throw new AppError(400, "USER_NOT_FOUND", "User not found");
    }

    return {
      id: udpatedUser.id,
      name: udpatedUser.name,
      email: udpatedUser.email,
      role: udpatedUser.role,
      isVerified: udpatedUser.isVerified,
    };
  }

  async changePassword(id: string, data: ChangePasswordDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "INVALID_ID", "Invalid user id");
    }

    const user = await userRespository.findByUserId(id);

    if (!user) {
      throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    const isPasswordCorrect = await comparePassword(
      data.currentPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new AppError(
        401,
        "INVALID_CREDENTIALS",
        "Current password is incorrect",
      );
    }

    const hashedPassword = await hashPassword(data.newPassword);

    await userRespository.updatePassword(id, hashedPassword);
  }

  async deleteUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError(400, "INVALID_ID", "Invalid user id");
    }

    const deletedUser = await userRespository.deleteUser(id);

    if (!deletedUser) {
      throw new AppError(400, "USER_NOT_FOUND", "User not found");
    }

    return {
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
      role: deletedUser.role,
      isVerified: deletedUser.isVerified,
    };
  }
}

export default new UserService();
