import { PivoteCuentasPromesas } from "../../models/PivoteCuentasPromesasModel.js";
import { authErrorRes, errorRes, successUpdateRes, updateErrorRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllPivotesCuentas = async(req, res) => {
  const { key } = req.params;
  const { atributos } = req.query;

  try {
    const auth = await autenticar(key);
    if(auth){
      res.json(authErrorRes());
      return;
    }

    const pivotes = await PivoteCuentasPromesas.findAll(atributosControl(atributos));
    res.json(pivotes);
    
  } catch (error) {
    res.json(error);  
  }
}

export const getPivotesCuentasById = async(req, res) => {
  const { key } = req.param;
  const { atributos } = req.query;

  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }

    const pivotes = await PivoteCuentasPromesas.findAll(atributosControl(atributos));
    res.json(pivotes);
    
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const updatePivoteCuentaById = async(req, res) => {
  const { key, id } = req.params;
  const payload = req.paramas;

  if(!payload.fecha || !payload.total) {
    res.json(updateErrorRes(payload, "No Cuenta Con Los Valores Requeridos Para El Update"));
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
    const pivote = await PivoteCuentasPromesas.update(payload, condicion);
    
    res.json(successUpdateRes(payload, 'Tu Pivote Quedo Actualizado'));

  } catch (error) {
    res.json(error);
  }
}