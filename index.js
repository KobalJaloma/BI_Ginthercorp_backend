//IMPORTACIONES DE CONFIGRACIONES
import express from 'express';
import bodyParser from "body-parser"; //MIDDLEWARE PARA req.body
import http from "http";
import https from "https";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swagger } from "./swagger-docs/swagger.js";

//IMPORTACION DE VARIABLES DE ENTORNO
import { config } from "./config.js";
// console.log("configs: " + JSON.stringify(config));


//TESTING
// import { autenticar } from "./helpers/autenticacion.js";
// import { generarPassword } from "./helpers/generadorContraseñas.js";
// import { db, db_denken } from "./config/db.js";
// import { TestRoute } from "./routes/TestRoute.js";
// import { testDenkenRoutes } from "./routes/denken/testDenken.js";

// //Importacion de Rutas
// import { usuariosRoutes } from "./routes/usuariosRoutes.js";
// import { connectionRoutes } from "./routes/conecctionRoute.js";
// import { catCuentasBancosRoutes } from "./routes/catCuentasBancosRoutes.js";
// import { catTipoMovimientosRoutes } from "./routes/catTipoMovimientosBancoRoutes.js";


const app = express();

//se configura el body parser para poder utilizar el req.body - MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// //Establecer Rutas
// app.use('/api/usuarios', usuariosRoutes);
// app.use('/api/connect', connectionRoutes);
// app.use('/api/catcuentasbancos', catCuentasBancosRoutes);
// app.use('/api/cattipomovimientos', catTipoMovimientosRoutes);


// //RUTAS TEST
// app.use('/api/test', TestRoute);
// app.use('/api/testDenken', testDenkenRoutes);


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
    // db.authenticate()
    //     .then((response) => console.log('Conexion exitosa a DB'));
    // db_denken.authenticate()
    //     .then((response) => console.log('Conexion exitosa a DB_denken'));
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

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(spec, { explorer: false }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));



//NO SE NECESITARA PRTOCOLO HTTPS POR EL MOMENTO-  LEONARDO

