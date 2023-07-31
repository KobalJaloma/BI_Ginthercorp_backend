import { Connection } from "../models/ConnectionModel.js";
import { errorRes, successRes } from "../types/responseTypes.js";
import { atributosControl } from "../types/sequelizeControl.js";
import { generarPassword } from "../helpers";

export const getAllConnections = async(req, res) => {
  try {
    const { atributos } = req.query;
    const condicionSeq = {...atributosControl(atributos)};
    const connections = Connection.findAll(condicionSeq);
    
    res.json(connections);

  } catch (error) {
    errorRes(error, 'No se pudieron extraer las claves!');
  }
}



export const createConnection = async(req, res) => {
 try {
  const passControl = 10;
  const password = await generarPassword(passControl);
  
  if(password < passControl) {
    errorRes('','La contraseña se genero de forma erronea');
  }
  const payload = {
    key: password
  }
  
  const connection = Connection.create(payload);

  successRes(`La Clave Se Creo Con Exito: ${password}`);
  
 } catch (error) {
  errorRes(error, 'La Clave No Se Pudo Crear Con Exito');
 }
}