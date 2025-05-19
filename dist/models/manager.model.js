"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const sequelize_1 = require("sequelize");
const sequelizedb_1 = __importDefault(require("../db/sequelizedb"));
const employee_model_1 = require("./employee.model");
class Manager extends sequelize_1.Model {
}
exports.Manager = Manager;
Manager.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: employee_model_1.Employee,
            key: "username",
        },
    },
    task: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelizedb_1.default,
    tableName: "managers",
    modelName: "Manager",
    timestamps: false,
});
employee_model_1.Employee.hasMany(Manager, { foreignKey: "username" });
Manager.belongsTo(employee_model_1.Employee, { foreignKey: "username" });
