import dbConnection from "../config/db.config";
import { User } from "../model/User";

const UserModel = new User();

const checkIfEmailExists = async (email: any) => {
  const pool = dbConnection.pool;
  await UserModel.createTableUser();
  const query = "SELECT COUNT(*) FROM users WHERE email = $1";

  const result = pool.query(query, [email]);
  pool.end();

  return parseInt((await result).rows[0].count) === 0;
};

export { checkIfEmailExists };
