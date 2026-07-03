import UserModel, { User } from "../models/UserModel.js";

class UserRepository {
  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findByUserId(id: string) {
    return UserModel.findById(id);
  }

  async create(user: Pick<User, "name" | "email" | "password">) {
    return UserModel.create(user);
  }

  async getAllUsers() {
    return UserModel.find().select("-password");
  }

  async updateUser(id: string, data: Partial<User>) {
    return UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async updatePassword(id: string, hashedPassword: string) {
    return UserModel.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
      },
    );
  }

  async deleteUser(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

export default new UserRepository();
