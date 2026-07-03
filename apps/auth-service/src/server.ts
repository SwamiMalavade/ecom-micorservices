import app from "./app.js";
import connectDB from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./logger/logger.js";

try {
  const PORT = env.PORT;

  await connectDB();
  app.listen(PORT);
  logger.info(`listening on ${PORT}`);
} catch (error) {
  logger.error(error);
  process.exit(1);
}
