import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const PivoteCuentasLogica = db.define('pivote_cuentas_logica', {
  fk_cuenta_baco: {
    type: DataTypes.INTEGER
  },
  fk_total_compromisos: {
    type: DataTypes.INTEGER
  },
  fk_total_promesas: {
    type: DataTypes.INTEGER
  },
  fk_total_real: {
    type: DataTypes.INTEGER
  },
  total_balance: {
    type: DataTypes.FLOAT
  },
  fecha: {
    type: DataTypes.INTEGER
  },

})

(async()=> {
  await db.sync();
})();