import express from "express";
import morgan from "morgan";
import logger from "./logger/logger.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.http(message.trim());
      },
    },
  }),
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Good health",
  });
});

export default app;
