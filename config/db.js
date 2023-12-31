import sequelize, { Sequelize } from "sequelize";
import { config } from "../config.js";

//CONFIGURACION DE SEQUELIZE PARA LA DB
export const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_ROUTE,
    port: 3306,
    dialect: 'mysql'
});

export const db_denken = new Sequelize(config.DB_NAME_DENKEN, config.DB_USER_DENKEN, config.DB_PASSWORD_DENKEN, {
    host: config.DB_ROUTE_DENKEN,
    dialect: "mysql"
});

export const db_tickets = new Sequelize(config.DB_NAME_TICKETS, config.DB_USER_TICKETS, config.DB_PASSWORD_TICKETS, {
    host: config.DB_ROUTE_TICKETS,
    dialect: "mysql"
});

console.log(JSON.stringify(config));

// try {
//   await db.authenticate();
  
//   console.log('La conexion a BI se establecio de manera correcta.');
//   res.send({'message' : 'La conexion a BI se establecio de manera correcta.'});
  
//   console.log('La conexion a BI se establecio de manera correcta.');
// } catch (error) {
//   res.send({'message' : `No se puede conectar a la base de datos: ${error}`});
//   console.error('No se puede conectar a la base de datos:', error);
// }


