import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const PivoteCuentasCompromisos = db.define('pivote_cuentas_compromisos', {
  fk_cuenta_banco: {
    type: DataTypes.INTEGER
  },
  total_real_bancos: {
    type: DataTypes.FLOAT
  },
  total_compromisos: {
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