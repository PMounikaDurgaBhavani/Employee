import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize({
  port: Number(process.env.db_port),
  database: process.env.database as string,
  username: process.env.user as string,
  password: process.env.password as string,
  dialect: "mysql",
  host: process.env.host,
  sync: { alter: true }
});

(async () => {
  // await sequelize.sync();
  await sequelize
    .authenticate()
    .then((t) => {
      console.log("Database is connected");
    })
    .catch((c) => {
      console.log("DB connection error ", c);
    });
})();

export default sequelize;
