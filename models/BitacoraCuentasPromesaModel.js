import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const BitacoraCuentasPromesas = db.define('bitacora_cuentas_promesas', {
  fk_cuenta_banco: {
    type: DataTypes.INTEGER
  },
  total_real_bancos: {
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
})();