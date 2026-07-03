import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import ValidationError from "../errors/ValidationError.js";

const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ValidationError(result.error.issues));
    }
    req.body = result.data;
    next();
  };
};

export default validate;
