import { Request, Response, Router } from "express";
import {
  deleteSpecifySpare,
  editSpare,
  getAllSpares,
  getSpecifySpare,
  registerNewSpare,
} from "../../controller/APIv1/SpareController";
import { checkJwt } from "../../middleware/session";
import validate from "../../middleware/validator";
import { spareValidation } from "../../validators/SpareValidator";

/**
 * This is Spare CRUD
 */

const router = Router();

router.get("/", checkJwt, getAllSpares);

router.get("/:id", checkJwt, getSpecifySpare);

router.post("/create", checkJwt, validate(spareValidation()), registerNewSpare);

router.put("/edit-spare/:id", checkJwt, editSpare);

router.delete("/delete-spare/:id", checkJwt, deleteSpecifySpare);

export { router };
