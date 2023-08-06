import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const PivoteCuentasReales = db.define('pivote_cuentas_reales', {
  fk_cuenta_banco: {
    type: DataTypes.INTEGER
  },
  total: {
  type: DataTypes.FLOAT
  },
  fk_last_bitacora_banco: {
    type: DataTypes.INTEGER
  },
  fecha: {
    type: DataTypes.DATE
  },
});

(async() => {
  await db.sync();
})();