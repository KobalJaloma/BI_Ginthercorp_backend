import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Test = db.define('testing', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    usuario: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    connection_key: {
        type: DataTypes.STRING
    },
    last_update: {
        type: DataTypes.DATE
    },
});

(async() => {
    await db.sync();
})();