import { Request, Response, Router } from "express";
import { login, registerNewUser } from "../../controller/APIv1/UserController";

const router = Router();

router.get("/auth", (req: Request, res: Response) => {
  res.json({ message: "hello world from API" });
});
router.post("/auth/register", registerNewUser);

router.post("/auth/login", login);

export { router };
