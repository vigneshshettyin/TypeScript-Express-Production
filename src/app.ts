import express, { Request, Response } from "express";
import characterRouter from "./router/character";
import functionLoadData from "./data/data";
// Swagger Imports
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Favicon Setup

import favicon from "serve-favicon";

import path from "path";

// CORS

import cors from "cors";

// Server Rate Limiting

import rateLimit from "express-rate-limit";

// API Cache

import apicache from "apicache";

// Server Status

import morgan from "morgan";

const app = express();
// pscale connect tsc-db-test dev --execute 'yarn dev'

// Express configuration

app.use(express.json());

app.use(morgan("tiny"));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// CORS Setup
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:8000"],
};
app.use(cors(corsOption));

// Cache Setup

let cache = apicache.middleware;

app.use(cache("5 minutes"));

// Rate Limiter Setup

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 2 requests per windowMs
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// PORT SETUP
const port = process.env.PORT || 3000;

// Swagger Docs Setup

const options = {
  definition: {
    openapi: "1.0.0",
    info: {
      title: "Poki API",
      version: "3.0.0",
      description:
        "All the Pokémon data you'll ever need in one place, easily accessible through a modern RESTful API.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./router/character.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api", characterRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Poki API",
    language: "typescript",
    version: "1.0.0",
  });
});

app.get("/load", async (req: Request, res: Response) => {
  await functionLoadData();
  res.json({
    message: "Loaded",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
