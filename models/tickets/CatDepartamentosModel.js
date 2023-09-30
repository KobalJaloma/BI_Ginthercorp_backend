import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const CatDepartamento = db_tickets.define('cat_departamentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_sucursal: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion : {
        type: DataTypes.STRING
    }
});


(async () => {
    await db_tickets.sync();
})();