import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const CatPrioridad = db_tickets.define('cat_prioridades', {
    nivel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
});

(async () => {
    await db_tickets.sync();
})();