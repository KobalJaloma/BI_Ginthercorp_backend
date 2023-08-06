import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const BitacoraCuentasLogica = db.define('bitacora_cuentas_logica', {
  fk_cuenta_banco: {
    type: DataTypes.INTEGER
  },
  fk_total_compromisos: {
    type: DataTypes.FLOAT
  },
  fk_total_promesas: {
    type: DataTypes.FLOAT
  },
  fk_total_real: {
    type: DataTypes.FLOAT
  },
  total_balance: {
    type: DataTypes.FLOAT
  },
  fecha: {
    type: DataTypes.DATE
  },
});

(async() => {
  await db.sync();
})();