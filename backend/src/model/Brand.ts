import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";

const BrandModel = dbConnection.sq.define("brands", {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

console.log(BrandModel.getTableName());

export default BrandModel;
