import { Request, Response } from "express";
import { generateToken } from "../../utils/handlerJWT";
import { User } from "../../model/User";
import { checkIfEmailExists } from "../../service/authService";
import { encrypt } from "../../utils/handlerPass";

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
  const { email, password } = body;
  const foundEmail = await checkIfEmailExists(email);
  let response = {
    result: false,
    action: "Success",
    message: "email is already used",
    status: 400,
    jwt: "",
  };

  const predefinedData = {
    isTester: false,
    isActive: true,
    role: "usuario",
    avatar: "avatar.jpg",
    allowPersonalDocuments: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isPremium: false,
  };

  if (!foundEmail) {
    const UserModel = new User();
    const passHash = await encrypt(password);
    body = { ...body, ...predefinedData };
    body.password = passHash;
    response.message = "User saved succesfully";
    UserModel.saveUser(body)
      .then(() => {
        console.log("Usuario guardado correctamente");
      })
      .catch((err) => {
        response.message = "user not saved succesfully";
        console.log(body);
      });
    const jwt = generateToken(body);
    response.result = true;
    response.action = "success";
    response.jwt = jwt;
    response.status = 200;
  }

  res.send(response);
};

export { registerNewUser };
