import { PivoteCuentasLogica } from "../../models/PivoteCuentasLogicaModel.js";
import { authErrorRes, errorRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";

export const getAllPivotesCuentas = async(req, res) => {
  const { key } = req.params;
  const { atributos } = req.query;

  try {
    let auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const pivotes = await PivoteCuentasLogica.findAll(atributosControl(atributos));

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
    
    const pivotes = await PivoteCuentasLogica.findAll(parametros);

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
    
    const pivote = await PivoteCuentasLogica.update(payload, condicion);
    res.json(successUpdateRes(payload, 'Tu Pivote Quedo Actualizado'));
    
  } catch (error) {
    res.json(errorRes(error, 'Ocurrio Un Error Al Querer Actualizar - SISTEMA'))
  }
}