import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Connection = db.define('connections', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  key: {
    type: DataTypes.STRING
  }
});

(async() => {
  await db.sync();
})();