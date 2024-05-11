import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import CarModel from "./Car";

const FuelTypeModel = dbConnection.sq.define("carType", {
  fuel: { type: DataTypes.STRING, allowNull: false },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CarModel,
      key: "id",
    },
  },
});

FuelTypeModel.belongsTo(CarModel, { foreignKey: "carId" });

console.log(FuelTypeModel.getTableName());

export default FuelTypeModel;
