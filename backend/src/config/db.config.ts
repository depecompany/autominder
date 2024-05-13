import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const POSTGRES_DATABASE = process.env.DB_DATABASE as string;
const POSTGRES_USERNAME = process.env.DB_USERNAME as string;
const POSTGRES_PASSWORD = process.env.DB_PASSWORD as string;
const POSTGRES_PORT = process.env.DB_PORT as string;

console.log(POSTGRES_PASSWORD, typeof POSTGRES_PASSWORD);

const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    host: "postgres",
    port: parseInt(POSTGRES_PORT),
    logging: false,
  }
);

export default {
  sq: sequelize,
};
