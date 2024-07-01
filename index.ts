import express, { Express, Response } from "express";
import knex from "knex";
import dotenv from "dotenv";
import { Model } from "objection";
import router from "./src/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swaggerConfig.json";
import cors from "cors";

dotenv.config();

const PORT = process.env.DB_PORT || "5432";
const knekInstance = knex({
  client: "pg",
  connection: {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    port: parseInt(PORT),
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
  },
});
Model.knex(knekInstance);
const app: Express = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
