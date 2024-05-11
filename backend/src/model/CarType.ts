import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import CarModel from "./Car";

const CarTypeModel = dbConnection.sq.define("carType", {
  type: { type: DataTypes.STRING, allowNull: false },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CarModel,
      key: "id",
    },
  },
});

CarTypeModel.belongsTo(CarModel, { foreignKey: "carId" });

console.log(CarTypeModel.getTableName());

export default CarTypeModel;
