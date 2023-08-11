import { Bitacora_Banco } from "../../models/BitacoraBancosModel.js";
import { errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl, periodosControl } from "../../types/sequelizeControl.js";

export const getAllBitacoraBancos = async(req, res) => {
  const { fechaI, fechaF, id, atributos } = req.query;

  const periodos = periodosControl(fechaI, fechaF, 'fecha', false);
  const atributosCondicion = atributosControl(atributos);
  let queryCondicion = { ...atributosCondicion ,
      where: periodos, id: id  };

  try {
    const response = await Bitacora_Banco.findAll(queryCondicion);

    res.json(response);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const createBitacoraBancos = async(req, res) => {
  const payload = req.body; 

  if(!payload)
    return res.json(errorRes('NO DATA', 'No Se Encontro El Payload En El Body'));
  
  try {
    const create = await Bitacora_Banco.create(payload);

    res.json(successRes());
  } catch (error) {
    res.json(errorRes(error));
  } 
}