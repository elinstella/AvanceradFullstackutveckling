import express from "express";
import helmet from "helmet";
import cors from "cors";
import pino from "pino";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { openapi } from "./swagger.js";
import { createRouter } from "./routes.js";

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "";

const app = express();
const log = pino({ name: "api", level: process.env.NODE_ENV === "production" ? "info" : "debug" });

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use("/", createRouter({ log, apiKey: API_KEY }));

app.listen(PORT, () => {
  log.info({ port: PORT, env: process.env.NODE_ENV }, "api_started");
});
