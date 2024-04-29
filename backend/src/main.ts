import express, { Application } from "express";
import "dotenv/config";
import morgan from 'morgan';
import cors from 'cors';
import dbConnect from "./config/db.config";

import { router } from './route/ApiV1/index';

const PORT = process.env.PORT;

const app: Application = express();
app.use(router);
app.use(morgan('dev'));
app.use(cors());

dbConnect.db();

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});