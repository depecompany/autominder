import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";
import SparePartsModel from "./SpareParts";
import CarModel from "./Car";

const MaintenanceModel = dbConnection.sq.define("carType", {
  part: { type: DataTypes.STRING, allowNull: false },
  sparePartsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SparePartsModel,
      key: "id",
    },
  },
  car: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: CarModel, key: "id" },
  },
});

MaintenanceModel.belongsTo(SparePartsModel, { foreignKey: "sparePartsId" });

console.log(MaintenanceModel.getTableName());

export default MaintenanceModel;
