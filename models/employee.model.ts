import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizedb";

export class Employee extends Model {
  public username!: string;
  private password!: string;
  public email!: string;
  public salary!: number;
}

Employee.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Employees",
    modelName: "Employee",
    timestamps: false,
  }
);

export default { Employee };
