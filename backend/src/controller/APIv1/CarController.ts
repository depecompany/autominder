import { Request, Response } from "express";
import CarModel from "../../model/Car";
import { getUserIdFromToken, verifyToken } from "../../utils/handlerJWT";
import UserModel from "../../model/User";

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
  let carId: number;

  const newCar = await CarModel.create({
    model,
    releaseYear,
    brand,
    userId,
  }).then((car) => {
    carId = car.dataValues.id;
    return carId;
  });

  response.result = true;
  response.message = "car create successfully";
  response.status = 200;

  await updateCarGroupUser(userId, newCar);

  res.send(response).status(response.status);
};

const getCarByUserId = async ({ params }: Request, res: Response) => {
  const { userId } = params;

  const car: any = await CarModel.findOne({
    where: { userId: parseInt(userId) },
  }).then((carFind) => {
    return carFind?.dataValues;
  });

  res.json(car).status(200);
};

const updateCarGroupUser = async (userId: number, carId: number) => {
  let foundedUser = await UserModel.findOne({ where: { id: userId } }).then(
    (user) => {
      return user?.dataValues;
    }
  );

  const { carGroup } = foundedUser;
  let listOfCars = [];
  if (carGroup && carGroup.length > 0) {
    for (let i = 0; i < carGroup.length; i++) {
      listOfCars.push(carGroup[i]);
    }
  }
  listOfCars.push(carId);

  await UserModel.update({ carGroup: listOfCars }, { where: { id: userId } });

  return listOfCars.at(-1) === carId ? true : false;
};

export { createNewCar, getCarByUserId };
