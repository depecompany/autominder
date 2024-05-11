import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import CarModel from "./Car";
import SparePartsModel from "./SpareParts";

const DurationModel = dbConnection.sq.define("brand", {
  name: { type: DataTypes.STRING, allowNull: false },
  sparePartsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SparePartsModel,
      key: "id",
    },
  },
});

DurationModel.belongsTo(SparePartsModel, { foreignKey: "sparePartsId" });

console.log(DurationModel.getTableName());

export default DurationModel;
