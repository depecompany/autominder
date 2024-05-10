import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import CarModel from "./Car";

const BrandModel = dbConnection.sq.define("brand", {
  name: { type: DataTypes.STRING, allowNull: false },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CarModel,
      key: "id",
    },
  },
});

BrandModel.belongsTo(CarModel, { foreignKey: "carId" });

console.log(BrandModel.getTableName());

export default BrandModel;
