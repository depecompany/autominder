import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string): string | undefined => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((module) => {
      console.log(
        `Se esta cargando la rutas API http://localhost:4201/api/${cleanName}`
      );
      router.use(`/${cleanName}`, module.router);
    });
  }
});

export { router };
