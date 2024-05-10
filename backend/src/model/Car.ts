import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import UserModel from "./User";

const CarModel = dbConnection.sq.define("cars", {
  model: { type: DataTypes.STRING, allowNull: false },
  releaseYear: { type: DataTypes.INTEGER, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  carType: { type: DataTypes.STRING, allowNull: true },
  isPersonal: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
  mileage: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  chasis: { type: DataTypes.INTEGER, allowNull: true },
  fuelType: { type: DataTypes.STRING, allowNull: true },
  hasMaintence: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

CarModel.belongsTo(UserModel, { foreignKey: "userId" });

console.log(CarModel.getTableName());

export default CarModel;
