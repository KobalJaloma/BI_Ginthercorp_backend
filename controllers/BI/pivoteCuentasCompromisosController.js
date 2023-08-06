import { PivoteCuentasCompromisos } from "../../models/PivoteCuentasCompromisosModel.js";
import { atributosControl} from "../../types/sequelizeControl.js";
import { authErrorRes, errorRes, successUpdateRes, updateErrorRes } from "../../types/responseTypes";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllPivoteCuentasCompromisos = async(req, res) => {
  const { key } = req.params;
  const { atributos } = req.query;


  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }   
    
    const pivote = await PivoteCuentasCompromisos(atributosControl(atributos));
    
    res.json(pivote);
  
  } catch (error) {
    res.json(errorRes(error))
  }
}

export const getPivotesCuentasById = async(req, res) => {
  const { id, key } = req.params;
  const { atributos } = req.query;

  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    
    const condicional = { where: { id: id } };
    let parametros = { ...condicional, ...atributosControl(atributos) };
    
    const pivote = await PivoteCuentasCompromisos.findAll(parametros);
    
    res.json(pivote);

  } catch (error) {
    res.json(errorRes(error))  
  }
}

export const updatePivoteCuentaById = async(req, res) => {
  const { key, id } = req.params;
  const payload = req.body;

  const condicion = { where: { id: id } };

  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
  
    const pivote = await PivoteCuentasCompromisos.update(payload, condicion);
    res.json(successUpdateRes(payload, 'Tu Pivote Quedo Actualizado'));
  
  } catch (error) {
    res.json(errorRes(error));
  }
}