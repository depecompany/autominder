import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import CarModel from "./Car";

const SparePartsModel = dbConnection.sq.define("carType", {
  isOriginal: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  price: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CarModel,
      key: "id",
    },
  },
});

SparePartsModel.belongsTo(CarModel, { foreignKey: "carId" });

console.log(SparePartsModel.getTableName());

export default SparePartsModel;
