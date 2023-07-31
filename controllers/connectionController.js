import { Connection } from "../models/ConnectionModel.js";
import { errorRes, successRes } from "../types/responseTypes.js";
import { atributosControl } from "../types/sequelizeControl.js";

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
