import { sign, verify } from "jsonwebtoken";
import { UserInterface } from "../interfaces/User.inteface";

const JWT_TOKEN = process.env.JWT_SECRET as string;

const generateToken = (payload: any) => {
  const jwt = sign(payload, JWT_TOKEN, {
    algorithm: "HS256",
  });

  return jwt;
};

const verifyToken = (token: string) => {
  const isOk = verify(token, JWT_TOKEN);
  return isOk;
};

export { generateToken, verifyToken };
