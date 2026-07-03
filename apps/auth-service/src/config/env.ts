import dotenv from "dotenv";

dotenv.config();

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is missing in the .env file`);
  }
  return value;
}

export const env = {
  PORT: process.env.PORT ?? "5000",

  DB_CONNECTION_STRING: requireEnv(
    process.env.DB_CONNECTION_STRING,
    "DB_CONNECTION_STRING",
  ),

  JWT_SECRET: requireEnv(process.env.JWT_SECRET, "JWT_SECRET"),

  JWT_EXPIRES_IN: (process.env.JWT_EXPIRES_IN ?? "1h") as
    | `${number}${"s" | "m" | "h" | "d"}`
    | number,
};
