import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";

const FuelTypeModel = dbConnection.sq.define("fuelTypes", {
  fuel: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

console.log(FuelTypeModel.getTableName());

export default FuelTypeModel;
