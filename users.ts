import { Request, Response, Router } from "express";
import {
  login,
  registerNewUser,
  sendEmailController,
  getUserById,
} from "../../controller/APIv1/UserController";
import { checkJwt } from "../../middleware/session";
import { LoginValidator, RegisterValidator } from "../../validators/AuthValidator";
import { validatorMiddleware } from "../../middleware/validator";

const router = Router();

router.get("/auth", (req: Request, res: Response) => {
  res.json({ message: "hello world from API" });
});

router.post("/auth/register", validatorMiddleware(RegisterValidator), registerNewUser);

router.post("/auth/login", validatorMiddleware(LoginValidator), login);

router.post("/auth/send-email", sendEmailController);

router.get("/:id", checkJwt, getUserById);

export { router };
