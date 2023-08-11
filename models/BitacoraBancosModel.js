import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Bitacora_Banco = db.define('bitacora_bancos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_cuenta_banco: {
        type: DataTypes.INTEGER
    },
    tipo_movimiento_clave: {
        type: DataTypes.STRING
    },
    total: {
        type: DataTypes.FLOAT
    },
    descripcion: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    },
    fk_usuario: {
        type: DataTypes.INTEGER
    }
});


(async()=> {
    await db.sync();
})();