import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

// Update with your config settings.
const PORT = process.env.DB_PORT || "5432";
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      port: parseInt(PORT),
      host: process.env.DB_HOST as string,
      database: process.env.DB_NAME as string,
    },
  },
};

module.exports = config;
