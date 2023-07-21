//IMPORTACIONES DE CONFIGRACIONES
import express from 'express';
import http from "http";
import https from "https";

//IMPORTACION DE VARIABLES DE ENTORNO
import { config } from "./config.js";


//TESTING
import { autenticar } from "./helpers/autenticacion.js";

const auth = async() => {await autenticar(10, "")}; 

const app = express();

app.use('/api/test', (req, res) => {
    res.send({"message": 'La ruta especificada esta funcionando correctamente'});
});

app.use('/api/test/log', (req, res) => {
    res.send({"message": '20'});
});

//RUTAS ESPECIFICAS
app.use('/', (req, res) => {
    res.send('PAGINA DE INICIO');
});


//PROTOCOLOS DE WEB
const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('Escuchando puerto 80');
});


//PUERTO ESPECIFICADO PARA TENER EL API
app.listen(config.PORT, (res, req) => {
    console.log(`Escuchando el puerto ${config.PORT} para el API`);
});


//NO SE NECESITARA PRTOCOLO HTTPS -  LEONARDO

