import { Router } from "express";
import {
  createNewCar,
  getCarByUserId,
} from "../../controller/APIv1/CarController";

const router = Router();

router.post("/new", createNewCar);

router.get("/get", getCarByUserId);

export { router };
