import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import UserModel from "./User";
import MaintenanceModel from "./Maintenance";
import CarTypeModel from "./CarType";
import FuelTypeModel from "./FuelType";

const CarModel = dbConnection.sq.define("cars", {
  model: { type: DataTypes.STRING, allowNull: false },
  releaseYear: { type: DataTypes.INTEGER, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  carType: { type: DataTypes.INTEGER, allowNull: true, references: { model: "carTypes", key: "id" } },
  isPersonal: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
  mileage: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  chasis: { type: DataTypes.INTEGER, allowNull: true },
  fuelType: { type: DataTypes.INTEGER, allowNull: true, references: { model: "fuelTypes", key: "id" } },
  hasMaintence: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
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

CarModel.belongsTo(UserModel, { foreignKey: "userId", onDelete: "cascade" });
CarModel.hasOne(CarTypeModel, { foreignKey: "carType", as: "carTypeDetail", onDelete: "cascade" });
CarModel.hasOne(FuelTypeModel, { foreignKey: "fuelType", as: "fuelTypeDetail", onDelete: "cascade" });

console.log(CarModel.getTableName());

export default CarModel;
