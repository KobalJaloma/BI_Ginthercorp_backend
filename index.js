//IMPORTACIONES DE CONFIGRACIONES
import express from 'express';
import http from "http";
import https from "https";

//IMPORTACION DE VARIABLES DE ENTORNO
import { config } from "./config.js";


//TESTING
import { autenticar } from "./helpers/autenticacion.js";
import { generarPassword } from "./helpers/generadorContraseñas.js";

const auth = async() => {await autenticar(10, "")}; 

const app = express();
const testRoutes = express.Router();

app.use('/api/test', async(req, res) => {
    var a = await generarPassword(15);
    res.send({"message": `La ruta especificada esta funcionando correctamente ${a}`});
});

//RUTAS TEST
app.use('/', (req, res) => {
    res.send('pagina de inicio')
});

app.use('/test', testRoutes);

//PROTOCOLOS DE WEB
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('Escuchando puerto 80');
});


//PUERTO ESPECIFICADO PARA TENER EL API
app.listen(config.PORT, (res, req) => {
    console.log(`Escuchando el puerto ${config.PORT} para el API`);
});


//NO SE NECESITARA PRTOCOLO HTTPS POR EL MOMENTO-  LEONARDO

