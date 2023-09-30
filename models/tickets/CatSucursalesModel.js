import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const CatSucursal = db_tickets.define('cat_sucursales', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fk_empresa: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    numero_direccion: {
        type: DataTypes.STRING
    },
    calle: {
        type: DataTypes.STRING
    },
    colonia: {
        type: DataTypes.STRING
    },
    ciudad: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    }
});


(async () => {
   await db_tickets.sync();
})();