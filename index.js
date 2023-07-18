//IMPORTACIONES DE CONFIGRACIONES
import express from 'express';
import http from "http";
import https from "https";

//IMPORTACION DE VARIABLES DE ENTORNO
import { config } from "./config.js";

const app = express();


app.use('/api/test', (req, res) => {
    res.send({"message": 'La ruta especificada esta funcionando correctamente'});
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

