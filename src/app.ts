import express, { Request, Response } from "express";
import characterRouter from "./router/character";
import functionLoadData from "./data/data";
// Swagger Imports
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const app = express();
// pscale connect tsc-db-test dev --execute 'yarn dev'

// Express configuration

app.use(express.json());

// PORT SETUP
const port = process.env.PORT || 3000;

// Swagger Docs Setup

const options = {
  definition: {
    openapi: "1.0.0",
    info: {
      title: "Poki API",
      version: "1.0.0",
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
