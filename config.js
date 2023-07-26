import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

//CONFIGURACION PARA SACAR EL DIRNAME
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// console.log("dirname: " + _dirname + '\n' 
//             + 'Este es el espacio: ' + process.env.NODE_ENV);

// console.log("process: "+ JSON.stringify(process.env));

dotenv.config({
    path: path.resolve(_dirname, (process.env.NODE_ENV || 'production') + '.env')
});

console.log("ESTE ES EL ESPACIO ACTUAL " + process.env.NODE_ENV);


//EXPORTACION DE LAS VARIABLES DE ENTORNO
export const config = {
    NODE_ENV:process.env.NODE_ENV,

    HOST:process.env.HOST,
    PORT:process.env.PORT,
    
    DB_ROUTE:process.env.DB_ROUTE,
    DB_NAME:process.env.DB_NAME,
    DB_USER:process.env.DB_USER, 
    DB_PASSWORD:process.env.DB_PASSWORD,
    
    DB_ROUTE_DENKEN:process.env.DB_ROUTE_DENKEN,
    DB_NAME_DENKEN:process.env.DB_NAME_DENKEN,
    DB_USER_DENKEN:process.env.DB_USER_DENKEN, 
    DB_PASSWORD_DENKEN:process.env.DB_PASSWORD_DENKEN
};