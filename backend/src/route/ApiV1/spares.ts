import { Request, Response, Router } from "express";
import {
  deleteSpecifySpare,
  editSpare,
  getAllSpares,
  getSpecifySpare,
  registerNewSpare,
} from "../../controller/APIv1/SpareController";
import { checkJwt } from "../../middleware/session";

const router = Router();

router.get("/spares", checkJwt, getAllSpares);

router.get("/spare", checkJwt, getSpecifySpare);

router.post("/create", checkJwt, registerNewSpare);

router.put("edit-spare", checkJwt, editSpare);

router.delete("delete-spare", checkJwt, deleteSpecifySpare);

export { router };
