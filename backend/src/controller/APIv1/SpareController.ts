import { Request, Response } from "express";
import SparePartsModel from "../../model/SpareParts";

const registerNewSpare = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
    spare: Object,
  };

  if (!body) res.send(response).status(response.status);

  const newSpare = await SparePartsModel.create(body);

  response.result = true;
  response.action = "Success";
  response.message = "Spare created successfully";
  response.status = 200;
  response.spare = newSpare as any;

  res.send(response).status(response.status);
};

const editSpare = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
  };

  if (!body) res.send(response).status(response.status);

  const { part, duration, isOriginal, price, carId } = body;
  await SparePartsModel.update(
    { part, duration, isOriginal, price, carId },
    { where: { carId: carId } }
  );

  response.result = true;
  response.action = "Success";
  response.message = "Spare updated successfully";
  response.status = 200;

  res.send(response).status(response.status);
};

const getAllSpares = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
  };

  if (!body) res.send(response).status(response.status);

  const { carId } = body;
  const spares = await SparePartsModel.findAll({ where: { carId: carId } });

  response.result = true;
  response.action = "Success";
  response.message = "Spares list founded successfully";
  response.status = 200;

  res.send(spares).status(response.status);
};

const getSpecifySpare = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
  };

  if (!body) res.send(response).status(response.status);
  const { part, duration, isOriginal, price, carId } = body;
  const spare = await SparePartsModel.findOne({
    where: {
      carId: carId,
      part: part,
      duration: duration,
      isOriginal: isOriginal,
      price: price,
    },
  });

  response.result = true;
  response.action = "Success";
  response.message = "Spare founded successfully";
  response.status = 200;

  res.send(spare).status(response.status);
};

const deleteSpecifySpare = async ({ body }: Request, res: Response) => {
  let response = {
    result: false,
    action: "Error",
    message: "Bad Request",
    status: 400,
  };

  if (!body) res.send(response).status(response.status);

  const { carId } = body;
  await SparePartsModel.destroy({ where: { carId: carId } });

  response.result = true;
  response.action = "Success";
  response.message = "Spare deleted successfully";
  response.status = 200;

  res.send(response).status(response.status);
};

export {
  registerNewSpare,
  editSpare,
  getAllSpares,
  getSpecifySpare,
  deleteSpecifySpare,
};
