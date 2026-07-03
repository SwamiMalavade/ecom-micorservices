import { HydratedDocument } from "mongoose";
import { JwtPayload } from "../utils/jwt.js";

declare global {
  namespace Express {
    interface Request {
      user: HydratedDocument<User>;
    }
  }
}

export {};
