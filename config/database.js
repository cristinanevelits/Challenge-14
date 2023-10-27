import { Sequelize } from "sequelize";
import 'dotenv/config'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  protocol: "mysql",
  logging: true,
});

export default sequelize;