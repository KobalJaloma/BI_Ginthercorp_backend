import sequelize, { Sequelize } from "sequelize";
import { config } from "../config.js";

//CONFIGURACION DE SEQUELIZE PARA LA DB
const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.HOST,
    dialect: 'mysql'
});

export const testConnect = async() => {
    try {
        await db.authenticate();
        console.log('La conexion se establecio de manera correcta.');
      } catch (error) {
        console.error('No se puede conectar a la base de datos:', error);
      }
}