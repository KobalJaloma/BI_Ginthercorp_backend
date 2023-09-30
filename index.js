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
import { db, db_denken, db_tickets} from "./config/db.js";
import { TestRoute } from "./routes/TestRoute.js";
import { testDenkenRoutes } from "./routes/denken/testDenken.js";

// //Importacion de Rutas BI
import { usuariosRoutes } from "./routes/usuariosRoutes.js";
import { connectionRoutes } from "./routes/conecctionRoute.js";
import { catCuentasBancosRoutes } from "./routes/catCuentasBancosRoutes.js";
import { catTipoMovimientosRoutes } from "./routes/catTipoMovimientosBancoRoutes.js";
import { bitacoraBancosRoutes } from "./routes/bitacoraBancosRoutes.js";


// //Importacion de Rutas DENKEN
import { catUnidadesNegocioRoutes } from "./routes/denken/catUnidadesNegocioRoutes.js";
import { sucursalesRoutes } from "./routes/denken/sucursalesRoutes.js";
import { cxcRoutes } from "./routes/denken/cxcRoutes.js";
import { facturasRoutes } from "./routes/denken/facturasRoutes.js";
import { movimientosBancariosRoutes } from "./routes/denken/movimientosBancosRoutes.js";
import { graficaCalculosRoutes } from "./routes/denken/graficasCalculosRoutes.js";

//autenticacion
import { authErrorRes } from "./types/responseTypes.js";
import { autenticar } from "./helpers/autenticacion.js";

//Constates de configuracion de enrutamiento
const version = 'v1.0';
const intiUrl = `/api/${version}`


const app = express();
//se configura el body parser para poder utilizar el req.body - MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//SERVER DE SAGGER
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger));

//middleware de AUTENTICACION
app.use(async(req, res, next) => {
  const token = req.headers.token;
  if(!token) {
    return res.status('401').json({
      ...authErrorRes(), 
      message: 'No Se Encontro La Clave Cifrada En Los Headers'
    });
  }
  const auth = await autenticar(token);
  if(auth) {
    return res.status('403').json(authErrorRes());
  }
  next();
});


// //Establecer Rutas BI
app.use(`${intiUrl}/usuarios`, usuariosRoutes);
app.use(`${intiUrl}/connect`, connectionRoutes);
app.use(`${intiUrl}/cat_cuentas_bancos`, catCuentasBancosRoutes);
app.use(`${intiUrl}/cat_tipo_movimientos`, catTipoMovimientosRoutes);
app.use(`${intiUrl}/bitacora_bancos`, bitacoraBancosRoutes);

//ESTABLECER RUTAS DE TICKETS


//Establecer Rutas DENKEN
app.use(`${intiUrl}/denken/cat_unidades_negocio`, catUnidadesNegocioRoutes);
app.use(`${intiUrl}/denken/sucursales`, sucursalesRoutes);
app.use(`${intiUrl}/denken/cxc`, cxcRoutes);
app.use(`${intiUrl}/denken/facturas`, facturasRoutes);
app.use(`${intiUrl}/denken/movimientos_bancarios`, movimientosBancariosRoutes);
//Rutas de calculos de graficas - DENKEN INFO
app.use(`${intiUrl}/denken/calculosgraficas`, graficaCalculosRoutes);


//RUTAS TEST
app.use(`${intiUrl}/test`, TestRoute);
app.use(`${intiUrl}/testDenken`, testDenkenRoutes);
app.use('/test', (req, res) => {
    res.send({message: 'hola swagger'})
});

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
        .then((response) => console.log('Conexion exitosa a DB'));
    db_denken.authenticate()
        .then((response) => console.log('Conexion exitosa a DB_denken'));
    db_tickets.authenticate()
        .then(response => console.log('Conexion exitosa a DB_tickets'));
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
//NO SE NECESITARA PRTOCOLO HTTPS POR EL MOMENTO-  LEONARDO




