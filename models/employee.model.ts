import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizedb";
import bcrypt from "bcrypt";

export class Employee extends Model {

  public username!: string;
  public password!: string;
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
      allowNull: false
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
    hooks:{
      beforeCreate:async(employee:Employee)=>{
        const saltRound=10;
          employee.password=await bcrypt.hash(employee.password,saltRound)
      }
    }
  }
);

export default { Employee };
