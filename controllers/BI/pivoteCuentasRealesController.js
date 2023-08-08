import { PivoteCuentasReales } from "../../models/PivoteCuentasRealesModel.js";
import { authErrorRes, errorRes, successUpdateRes, updateErrorRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllPivotesCuentas = async(req, res) => {
  const { atributos } = req.query;

  try {
    const pivotes = await PivoteCuentasReales.findAll(atributosControl(atributos));

    res.json(pivotes);
    
  } catch (error) {
    res.json(errorRes(error, 'Error Al Extraer Los Datos'));
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
    const condicional = { where: {id: id}}
    let parametros = { ...condicional, ...atributosControl(atributos) };
    
    const pivotes = await PivoteCuentasReales.findAll(parametros);

    res.json(pivotes);

  } catch (error) {
    res.json(errorRes(error));
  }
}


//UPDATES
export const updatePivoteCuentaById = async(req, res) => {
  const { key, id } = req.params;
  const payload = req.body;
  
  //FILTRO DE VALORES REQUERIDOS
  if(!payload.fecha || !payload.total) {
    res.json(updateErrorRes(payload, 'No Cuenta Con Los Valores Requeridos Para El Update'));
    return;
  }
  const condicion = { where: { id: id } };

  try {
    //AUTENTICAR
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    
    const pivote = await PivoteCuentasReales.update(payload, condicion);
    res.json(successUpdateRes(payload, 'Tu Pivote Quedo Actualizado'));
    
  } catch (error) {
    res.json(errorRes(error, 'Ocurrio Un Error Al Querer Actualizar - SISTEMA'))
  }
}