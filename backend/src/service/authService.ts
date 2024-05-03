import dbConnection from "../config/db.config";
import UserModel from "../model/User";

const checkIfEmailExists = async (email: string) => {
  let isAvaleibleEmail = await UserModel.findOne({ where: { email: email } });

  if (isAvaleibleEmail) {
    return true;
  }

  return false;
};

export { checkIfEmailExists };
