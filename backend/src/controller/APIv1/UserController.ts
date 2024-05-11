import { Request, Response, response } from "express";
import UserModel from "../../model/User";
import { checkIfEmailExists } from "../../service/authService";
import { encrypt, verified } from "../../utils/handlerPass";
import { SendEmailType, completeUserAuth } from "../../types/types";
import { UserInterface } from "../../interfaces/User.inteface";
import { generateToken } from "../../utils/handlerJWT";
import { sendEmail } from "../../service/sendEmailService";

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
    response.message = "hola";
  }

  res.send(response).status(response.status);
};

const login = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    user: {},
    status: 400,
  };
  const { email, password } = body;
  const emailAvaleible = await checkIfEmailExists(email);

  if (emailAvaleible) {
    const user: any = await UserModel.findOne({ where: { email: email } })
      .then((foundUser) => {
        return foundUser?.dataValues;
      })
      .catch((err) => {
        console.log(err);
      });

    const verify = verified(password, user.email);
    if (!verify) res.json(response).status(response.status);

    console.log(user);
    const token = generateToken(user);
    delete user.password;
    response.result = true;
    response.action = "Success";
    response.message = token;
    response.status = 201;
    response.user = user;

    res.json(response).status(response.status);
  } else {
    res.json(response).status(response.status);
  }
};

const sendEmailController = async ({ body }: Request, res: Response) => {
  const { to, subject, text }: SendEmailType = body;
  const senderEmail = await sendEmail({ to, subject, text });
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
  };

  if (senderEmail || senderEmail === "mail send with exist") {
    response.result = true;
    (response.action = "Success"),
      (response.message = "Correo enviado exitosamente");
    response.status = 200;
    res.send(response).status(response.status);
  } else {
    res.send(response).status(response.status);
  }
};

export { registerNewUser, login, sendEmailController };
