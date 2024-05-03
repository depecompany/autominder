import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const POSTGRES_DATABASE = process.env.DB_DATABASE as string;
const POSTGRES_USERNAME = process.env.DB_USERNAME as string;
const POSTGRES_PASSWORD = process.env.DB_PASSWORD as string;
const POSTGRES_PORT = process.env.DB_PORT as string;

const pool = new Pool({
  user: POSTGRES_USERNAME,
  host: "postgres",
  database: POSTGRES_DATABASE,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT),
});

const sequelize = new Sequelize(
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  {
    dialect: "postgres",
    host: "postgres",
    port: parseInt(POSTGRES_PORT),
  }
);

const databaseConnection = async () => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error connecting to database ", err);
    }

    console.log("Connection to database");
    release();
  });
};

const databaseConnectionSequelize = async () => {
  try {
    await sequelize.authenticate();
  } catch (err) {
    sequelize.close();
  }
};

export default {
  pool: pool,
  db: databaseConnection,
  sq: sequelize,
};
