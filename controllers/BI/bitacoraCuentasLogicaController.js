import { BitacoraCuentasLogica } from "../../models/BitacoraCuentasLogicaModel.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl, periodosControl } from "../../types/sequelizeControl.js";

export const getBitacoraCuentasLogica = async(req, res) => {
  const { key } = req.params;
  const { atributos, fechaI, fechaF } = req.query;
  
  
  try {
    //AUTENTICACION
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const sentencia = { ...atributosControl(atributos), ...periodosControl(fechaI, fechaF, 'fecha') };

    const bitacora = await BitacoraCuentasLogica.findAll(sentencia);

    res.json(bitacora);
  } catch (error) {
    res.json(errorRes(error))  
  }
}

export const createBitacoraCuentasLogica = async(req, res) => {
  const payload = req.body;
  const { key } = req.params;
  //VERIFICAR SI EL PAYLOAD EXISTE
  if(!payload) {
    res.json(errorRes('PAYLOAD', 'El Payload/Body Es Incorrecto O Esta Vacio'));
    return;
  }

  try {
      //AUTENTICACION
      const auth = await autenticar(key);
      if(auth) {
        res.json(authErrorRes());
        return;
      }
      const biotacora = await BitacoraCuentasLogica.create(payload);
      res.json(successRes('El Registro Fue Creado Exitosamente'));
  
  } catch (error) {
    res.json(errorRes(error));
  }
}