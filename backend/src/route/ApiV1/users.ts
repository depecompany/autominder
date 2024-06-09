import { Request, Response, Router } from "express";
import {
  login,
  registerNewUser,
  sendEmailController,
  getUserById,
} from "../../controller/APIv1/UserController";
import { checkJwt } from "../../middleware/session";
import { registerValidator } from "../../validators/AuthValidator";
import validate from "../../middleware/validator";

const router = Router();

router.get("/auth", (req: Request, res: Response) => {
  res.json({ message: "hello world from API" });
});

router.post("/auth/register", validate(registerValidator()), registerNewUser);

router.post("/auth/login", login);

router.post("/auth/send-email", sendEmailController);

router.get("/:id", checkJwt, getUserById);

export { router };
