import dbConnection from "../config/db.config";
import { Model, DataTypes } from "sequelize";
import { AuthUser, UserInterface } from "../interfaces/User.inteface";

const UserSequelize = dbConnection.sq.define("users", {
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

console.log(UserSequelize.getTableName());

const pool = dbConnection.pool;

class User {
  constructor() {}

  async createTableUser(): Promise<void> {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            username VARCHAR(100) NOT NULL,
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            password VARCHAR(150) NOT NULL,
            carGroup JSONB,
            isTester BOOLEAN NOT NULL,
            isActive BOOLEAN NOT NULL,
            role VARCHAR(50) NOT NULL,
            hideProfile BOOLEAN,
            avatar VARCHAR(255) NOT NULL,
            allowPersonalDocuments BOOLEAN NOT NULL,
            timezone VARCHAR(50) NOT NULL,
            isPremium BOOLEAN NOT NULL
        )
    `;

    try {
      await pool.query(query);
    } catch (error) {
      console.error("Error al crear la tabla usuarios:", error);
      throw error;
    }
  }

  public async saveUser(userData: UserInterface): Promise<void> {
    const {
      email,
      username,
      firstName,
      lastName,
      password,
      carGroup,
      isTester,
      isActive,
      role,
      hideProfile,
      avatar,
      allowPersonalDocuments,
      timezone,
      isPremium,
    } = userData;

    const query = `
        INSERT INTO users (email, username, firstName, lastName, password, carGroup, isTester, isActive, role, hideProfile, avatar, allowPersonalDocuments, timezone, isPremium)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `;

    const values = [
      email,
      username,
      firstName,
      lastName,
      password,
      carGroup,
      isTester,
      isActive,
      role,
      hideProfile,
      avatar,
      allowPersonalDocuments,
      timezone,
      isPremium,
    ];

    try {
      await pool.query(query, values);
    } catch (error) {
      throw error;
    }
  }

  public async findByEmail(email: any): Promise<void> {
    const query = "SELECT email FROM users WHERE email = $1";

    try {
      await pool.query(query, email);
    } catch (err) {}
  }
}

export { User, UserSequelize };
