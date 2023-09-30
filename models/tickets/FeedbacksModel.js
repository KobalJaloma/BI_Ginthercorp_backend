import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const Feedbacks = db_tickets.define('feedbacks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER
    },
    tarea_id: {
        type: DataTypes.INTEGER
    },
    tema: {
        type: DataTypes.STRING
    },
    mensaje: {
        type: DataTypes.STRING
    },
    visualizado: {
        type: DataTypes.INTEGER
    },
    fecha: {
        type: DataTypes.DATE
    },
});


(async () => {
    await db_tickets.sync();
})();