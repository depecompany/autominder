import dbConnection from "../config/db.config";
import { User } from "../model/User";

const UserModel = new User();

const checkIfEmailExists = async (email: any) => {
  const pool = dbConnection.pool;
  await UserModel.createTableUser();
  const query = "SELECT email FROM users WHERE email = $1";

  let isOk: boolean = false;
  pool
    .query(query, [email])
    .then((emails) => (emails === email ? (isOk = false) : (isOk = true)));

  return isOk;
};

export { checkIfEmailExists };
