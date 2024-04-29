import { Request, Response, Router } from "express";
import { registerNewUser } from "../../controller/UserController";

const router = Router();

router.get("/auth", (req: Request, res: Response) => {
  res.json({ message: "hello world from API" });
});

router.post("/auth/register", registerNewUser);

export { router };
