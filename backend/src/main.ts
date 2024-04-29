import express, { Application } from "express";
import "dotenv/config";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./config/db.config";
import { router as routerAPI } from "./route/ApiV1/index";
import { router as routerAdmin } from "./route/index";

const PORT = process.env.PORT;

const app: Application = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
app.use("/api", routerAPI);
app.use("/admin", routerAdmin);

dbConnect.db();

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
