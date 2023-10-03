import { db_tickets } from "../../config/db.js";
import { DataTypes } from "sequelize";

export const Tarea = db_tickets.define('tareas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    usuario_demandante_id: {
        type: DataTypes.INTEGER
    },
    usuario_demandado_id: {
        type: DataTypes.INTEGER
    },
    prioridad_nivel: {
        type: DataTypes.INTEGER
    },
    departamento_id: {
        type: DataTypes.INTEGER
    },
    sucursal_id: {
        type: DataTypes.INTEGER
    },
    progreso: {
        type: DataTypes.INTEGER
    },
    finalizada_demandante: {
        type: DataTypes.INTEGER
    },
    finalizada_demandado: {
        type: DataTypes.INTEGER
    },
    fecha_expedido: {
        type: DataTypes.DATE
    },
    fecha_limite: {
        type: DataTypes.DATE
    },
    fecha_finalizado: {
        type: DataTypes.DATE
    },
});


(async () => {
    await db_tickets.sync();
})();