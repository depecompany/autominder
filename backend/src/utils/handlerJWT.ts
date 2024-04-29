import { sign, verify } from "jsonwebtoken";

const JWT_TOKEN = process.env.JWT_SECRET as string;

const generateToken = (payload: Object) => {
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
