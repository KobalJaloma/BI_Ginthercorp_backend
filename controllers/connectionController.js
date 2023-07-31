import { Connection } from "../models/ConnectionModel.js";
import { errorRes, successRes } from "../types/responseTypes.js";
import { atributosControl } from "../types/sequelizeControl.js";
import { generarPassword } from "../helpers/generadorContraseñas.js";

export const getAllConnections = async(req, res) => {
  try {
    const { atributos } = req.query;
    const condicionSeq = {...atributosControl(atributos)};
    console.log(JSON.stringify(condicionSeq));
    const connections = await Connection.findAll(condicionSeq);
    
    res.json(connections);

  } catch (error) {
    res.json(errorRes(error, 'No se pudieron extraer las claves!'));
  }
}



export const createConnection = async(req, res) => {
 try {
  const passControl = 10;
  const password = await generarPassword(passControl);
  
  if(password < passControl) {
    res.json(errorRes('','La contraseña se genero de forma erronea'));
  }

  console.log("Password: " + password);

  const payload = {
    key: password
  }

  const connection = await Connection.create(payload);

  res.json(successRes(`La Clave Se Creo Con Exito: ${password}`));
  
 } catch (error) {
  res.json(errorRes(error, 'La Clave No Se Pudo Crear Con Exito'));
 }
}