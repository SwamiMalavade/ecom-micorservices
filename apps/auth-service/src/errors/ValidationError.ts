import AppError from "./AppError.js";

class ValidationError extends AppError {
  public readonly errors: unknown;

  constructor(errors: unknown) {
    super(400, "VALIDATION_ERROR", "Request validation failed.");

    this.errors = errors;
  }
}

export default ValidationError;
