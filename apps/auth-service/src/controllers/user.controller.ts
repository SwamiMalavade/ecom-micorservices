import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service.js";
import { ChangePasswordDto } from "../dto/auth/changePassword.dto.js";

type GetUserParams = {
  id: string;
};

type GetUpdateUserParams = {
  id: string;
  name: string;
  email: string;
};

class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(
    req: Request<GetUserParams>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.findUser(req.params.id);
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findUser(req.user.id);
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: Request<GetUserParams>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateUser(req.user.id, req.body);
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request<{}, {}, ChangePasswordDto>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      await userService.changePassword(req.user.id, req.body);

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(
    req: Request<GetUserParams>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userService.deleteUser(req.params.id);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user,
      });
      return;
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
