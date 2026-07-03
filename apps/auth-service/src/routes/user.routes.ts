import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import userController from "../controllers/user.controller.js";
import { ChangePasswordDto } from "../dto/auth/changePassword.dto.js";
import validate from "../middlewares/validation.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/me", userController.getCurrentUser);
router.patch("/me", userController.updateCurrentUser);

router.patch(
  "/change-password",
  validate(ChangePasswordDto),
  userController.changePassword,
);

router.get("/", authorize(["ADMIN"]), userController.getAllUsers);
router.get("/:id", authorize(["ADMIN"]), userController.getUser);
router.put("/:id", authorize(["ADMIN"]), userController.updateUser);
router.delete("/:id", authorize(["ADMIN"]), userController.deleteUser);

export default router;
