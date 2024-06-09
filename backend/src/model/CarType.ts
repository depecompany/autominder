import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";

const CarTypeModel = dbConnection.sq.define("carType", {
  type: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});


console.log(CarTypeModel.getTableName());

export default CarTypeModel;
