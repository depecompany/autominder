import dbConfig from "../config/db.config";
import CarModel from "../model/Car";
import { encrypt } from "../utils/handlerPass";
import UserModel from "../model/User";

const syncDatabase = async () => {
  await dbConfig.sq.sync({ force: true });

  const predefinedData = {
    isTester: false,
    isActive: true,
    role: "USER",
    avatar: "avatar.jpg",
    allowPersonalDocuments: false,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isPremium: false,
  };
  const user = await UserModel.create({
    username: "admin example",
    email: "admin@example.com",
    password: await encrypt("admin"),
    ...predefinedData,
  }).then((data) => {
    return data.dataValues;
  });
  const car = await CarModel.create({
    model: "Model X",
    releaseYear: 2021,
    brand: "Tesla",
    isPersonal: true,
    mileage: 10000,
    chasis: 12345,
    fuelType: "Electric",
    userId: user.id,
  });

  console.log("Base de datos poblada con datos iniciales");
};

syncDatabase().catch((error) =>
  console.error("Error al sincronizar la base de datos:", error)
);
