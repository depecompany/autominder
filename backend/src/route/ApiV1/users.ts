import { Request, Response, Router } from "express";
import {
  login,
  registerNewUser,
  sendEmailController,
} from "../../controller/APIv1/UserController";

const router = Router();

router.get("/auth", (req: Request, res: Response) => {
  res.json({ message: "hello world from API" });
});
router.post("/auth/register", registerNewUser);

router.post("/auth/login", login);

router.post("/auth/send-email", sendEmailController);

export { router };
