import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import SparePartsModel from "./SpareParts";

const PartModel = dbConnection.sq.define("parts", {
  part: { type: DataTypes.STRING, allowNull: false },
  sparePartsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SparePartsModel,
      key: "id",
    },
  },
});

PartModel.belongsTo(SparePartsModel, { foreignKey: "sparePartsId" });

console.log(PartModel.getTableName());

export default PartModel;
