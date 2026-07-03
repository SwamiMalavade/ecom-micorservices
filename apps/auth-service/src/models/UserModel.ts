import { InferSchemaType, Schema, model } from "mongoose";
import { USER_ROLES } from "../constants/roles.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.CUSTOMER,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof UserSchema>;

const UserModel = model("User", UserSchema);

export default UserModel;
