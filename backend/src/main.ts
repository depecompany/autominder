import express, { Application } from "express";
import "dotenv/config";

const PORT = process.env.PORT;

const app: Application = express();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
