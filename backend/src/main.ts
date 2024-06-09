import express, { Application } from "express";
import "dotenv/config";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dbConnect from "./config/db.config";
import { router as routerAPI } from "./route/ApiV1/index";
import { router as routerAdmin } from "./route/index";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.config";
import limiter from "./middleware/rateLimit";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

const PORT = process.env.PORT;

const app: Application = express();
app.use(limiter);
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(cors());
app.use("/api", routerAPI);
app.use("/admin", routerAdmin);
app.use("/api-doc/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

dbConnect.sq
  .authenticate()
  .then(() => {
    return dbConnect.sq.sync({ force: true });
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => {
        console.log(`Server on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });

export default app;
