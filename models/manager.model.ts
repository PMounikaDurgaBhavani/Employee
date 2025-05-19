import { Model, DataTypes } from "sequelize";
import sequelize from "../db/sequelizedb";
import { Employee } from "./employee.model";

export class Manager extends Model {
  public id!: number;
  public username!: string;
}

Manager.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Employee,
        key: "username",
      },
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "managers",
    modelName: "Manager",
    timestamps: false,
  }
);

Employee.hasMany(Manager, { foreignKey: "username" });
Manager.belongsTo(Employee, { foreignKey: "username" });
