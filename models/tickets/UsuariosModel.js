import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const Usuario = db_tickets.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido_paterno: {
        type: DataTypes.STRING
    },
    apellido_materno: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    telefono: {
        type: DataTypes.STRING
    },
    departamento_id: {
        type: DataTypes.INTEGER
    },
    activo: {
        type: DataTypes.INTEGER
    },
});

(async () => {
    await db_tickets.sync();
})();