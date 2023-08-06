import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const PivoteCuentasPromesas = db.define('pivote_cuentas_promesas', {
  fk_cuentas_banco: {
    type: DataTypes.INTEGER
  },
  total_real_banos: {
    type: DataTypes.FLOAT
  },
  total_promesas: {
    type: DataTypes.FLOAT
  },
  total: {
    type: DataTypes.FLOAT
  },
  fecha: {
    type: DataTypes.DATE
  },
});

(async() => {
  await db.sync();
})()