import { Router } from "express";
import {
  createNewCar,
  getCarByUserId,
} from "../../controller/APIv1/CarController";
import { checkJwt } from "../../middleware/session";
import validate from "../../middleware/validator";
import { carValidator } from "../../validators/CarValidator";

const router = Router();

router.post("/create", checkJwt, validate(carValidator()), createNewCar);

router.get("/get/:userId", checkJwt, getCarByUserId);

export { router };
