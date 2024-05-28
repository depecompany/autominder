import { Request, Response } from "express";
import CarModel from "../../model/Car";
import { getUserIdFromToken, verifyToken } from "../../utils/handlerJWT";

const createNewCar = async ({ body, headers }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Success",
    message: "Car not created",
    status: 400,
  };
  if (!body) res.send(response).status(response.status);
  const { model, releaseYear, brand } = body;
  const jwtToken = headers.authorization;
  const token = jwtToken?.split(" ").pop();
  const userId = getUserIdFromToken(token as string);

  const newCar = CarModel.create({ model, releaseYear, brand, userId });
  response.result = true;
  response.message = "car create successfully";
  response.status = 200;

  res.send(response).status(response.status);
};

const getCarByUserId = async ({ body }: Request, res: Response) => {
  const { userId } = body;

  const car: any = await CarModel.findOne({
    where: { userId: parseInt(userId) },
  }).then((carFind) => {
    return carFind?.dataValues;
  });

  res.json(car).status(200);
};

export { createNewCar, getCarByUserId };
