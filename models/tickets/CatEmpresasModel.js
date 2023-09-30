import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const CatEmpresas = db_tickets.define('cat_empresas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.INTEGER
    }
});

(async () => {
    await db_tickets.sync();
})();