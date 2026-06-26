import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Good health",
  });
});

export default app;
