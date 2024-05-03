import { Request, Response } from "express";
import UserModel from "../../model/User";
import { checkIfEmailExists } from "../../service/authService";
import { encrypt } from "../../utils/handlerPass";
import { completeUserAuth } from "../../types/types";
import { UserInterface } from "../../interfaces/User.inteface";

/**
 * @swagger
 * /api/users/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password
 *     tags:
 *      - "Auth"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 action:
 *                   type: string
 *                 message:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 jwt:
 *                   type: string
 *       '400':
 *         description: Bad request - Email is already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                 action:
 *                   type: string
 *                 message:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 jwt:
 *                   type: string
 */
const registerNewUser = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Success",
    message: "email is already used",
    user: {},
    status: 400,
    jwt: "",
  };
  if (!body.email && !body.password && !body.username) {
    response.action = "Error";
    response.message = "data missing";
    res.send(response).status(400);
  }
  const { email, password } = body;
  const isAvaleibleEmail = await checkIfEmailExists(email);

  const predefinedData = {
    isTester: false,
    isActive: true,
    role: "USER",
    avatar: "avatar.jpg",
    allowPersonalDocuments: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isPremium: false,
  };

  // if is false, the email is not register in the database
  if (!isAvaleibleEmail) {
    const passHash = await encrypt(password);
    body = { ...body, ...predefinedData } as UserInterface;
    body.password = passHash;
    response.message = "User saved succesfully";
    UserModel.create(body);
    response.result = true;
    response.action = "success";
    response.status = 200;
    delete body.password;
    const userCompletedAuth: completeUserAuth = body;
    response.user = userCompletedAuth;
  } else {
    response.message = "conflict";
    response.status = 403;
  }

  res.send(response).status(response.status);
};

const login = async ({ body }: Request, res: Response) => {
  const { email, password } = body;

  let isAvaleibleEmail = true;
  checkIfEmailExists(email).then((exists) => {
    isAvaleibleEmail = false;
  });
};

export { registerNewUser };
