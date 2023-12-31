import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const Comentario = db_tickets.define('comentarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER
    },
    tarea_id: {
        type: DataTypes.INTEGER
    },
    mensaje: {
        type: DataTypes.STRING
    },
    likes: {
        type: DataTypes.INTEGER
    },
    likes_usuarios: {
        type: DataTypes.INTEGER
    },
    fecha: { 
        type: DataTypes.DATE
    },
});

(async () => {
    await db_tickets.sync();
})();