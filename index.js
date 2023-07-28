//IMPORTACIONES DE CONFIGRACIONES
import express from 'express';
import http from "http";
import https from "https";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

//IMPORTACION DE VARIABLES DE ENTORNO
import { config } from "./config.js";


//TESTING
import { autenticar } from "./helpers/autenticacion.js";
import { generarPassword } from "./helpers/generadorContraseñas.js";
import { db } from "./config/db.js";

//Importacion de Rutas
import { TestRoute } from "./routes/TestRoute.js";
import { usuariosRoutes } from "./routes/usuariosRoutes.js";


const app = express();


//Establecer Rutas

//RUTAS TEST
app.use('/api/test', TestRoute);
app.use('/api/usuarios', usuariosRoutes);


// app.use('/test', (req, res) => {
//     res.send({message: 'hola swagger'})
// });

//PROTOCOLOS DE WEB
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('Escuchando puerto 80');
});


//PUERTO ESPECIFICADO PARA TENER EL API
app.listen(config.PORT, (req, res) => {
    console.log(`Escuchando el puerto ${config.PORT} para el API`);
});

//SEQUELIZE CONFIG AND SYNC
try {
    db.authenticate()
        .then((response) => console.log('Conexion exitosa a DB: ' + response));
} catch (error) {
    console.log('Error de conexion: ' + error);
}



//SWAGGER CONFIG
const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
          title: "API BI Ginthercorp",
          version: "0.1.0",
          description:
            "Documentacion del API de la aplicacion BI Ginthercorp",
          license: {
            name: "",
            url: "",
          },
          contact: {
            name: "Sistemas Ginthercorp",
            url: "",
            email: "sistemas@ginthercorp.com",
          },
        },
        servers: [
          {
            url: config.HOST,
          },
        ],
      },
      apis: ["./routes/*.js"]
};
const spec = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec, { explorer: false }));



//NO SE NECESITARA PRTOCOLO HTTPS POR EL MOMENTO-  LEONARDO

