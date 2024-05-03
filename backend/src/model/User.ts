import dbConnection from "../config/db.config";
import { DataTypes } from "sequelize";

const UserModel = dbConnection.sq.define("users", {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: true },
  lastName: { type: DataTypes.STRING, allowNull: true },
  carGroup: { type: DataTypes.INTEGER, allowNull: true },
  isTester: { type: DataTypes.BOOLEAN, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false },
  role: {
    type: DataTypes.ENUM("USER", "SUPER_ADMIN", "TESTER"),
    allowNull: false,
  },
  allowPersonalDocuments: { type: DataTypes.BOOLEAN, allowNull: false },
  timezone: { type: DataTypes.STRING, allowNull: false },
  isPremium: { type: DataTypes.BOOLEAN, allowNull: false },
});

console.log(UserModel.getTableName());

export default UserModel;
