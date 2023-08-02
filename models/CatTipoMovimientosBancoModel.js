import { db } from "../config/db.js";
import { DataTypes } from "sequelize";

export const TipoMovimientosBanco = db.define('cat_tipos_movimientos_bancos', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  descripcion: {
    type: DataTypes.STRING
  },
  clave: {
    type: DataTypes.STRING
  },
});

(async() => {
  await db.sync();
})();