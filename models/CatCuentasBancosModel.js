import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const CatCuentasBancos = db.define('cat_cuentas_bancos', {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  num_cuenta: {
    type: DataTypes.STRING
  },
  banco: {
    type: DataTypes.STRING
  },
  fk_unidad_negocio: {
    type: DataTypes.STRING
  },
  razon_social: {
    type: DataTypes.STRING
  }
});

(async() => {
  await db.sync();
})();