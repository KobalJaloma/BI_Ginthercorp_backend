import { DataTypes } from "sequelize";
import { db } from "../config/db";

const Bitacora_Banco = db.define('bitacora_bancos', {
    id: {
        type: DataTypes.NUMBER
    },
    fk_cuenta_banco: {
        type: DataTypes.NUMBER
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
        typeL: DataTypes.NUMBER
    }
});


(async()=> {
    await db.sync();
})();