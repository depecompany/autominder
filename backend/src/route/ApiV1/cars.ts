import { Router } from "express";
import {
  createNewCar,
  getCarByUserId,
} from "../../controller/APIv1/CarController";
import { checkJwt } from "../../middleware/session";

const router = Router();

router.post("/create", checkJwt, createNewCar);

router.get("/get", checkJwt, getCarByUserId);

export { router };
