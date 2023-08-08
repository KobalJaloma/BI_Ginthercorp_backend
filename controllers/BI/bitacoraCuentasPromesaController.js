import { BitacoraCuentasPromesas } from "../../models/BitacoraCuentasPromesaModel.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl, periodosControl } from "../../types/sequelizeControl.js";

export const getBitacoraCuentasPromesas = async(req, res) => {
  const { atributos, fechaI, fechaF } = req.query;
  
  
  try {
    const sentencia = { ...atributosControl(atributos), ...periodosControl(fechaI, fechaF, 'fecha') };

    const bitacora = await BitacoraCuentasPromesas.findAll(sentencia);

    res.json(bitacora);
  } catch (error) {
    res.json(errorRes(error))  
  }
}

export const createBitacoraCuentasPromesas = async(req, res) => {
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
      const biotacora = await BitacoraCuentasCompromisos.create(payload);
      res.json(successRes('El Registro Fue Creado Exitosamente'));
  
  } catch (error) {
    res.json(errorRes(error));
  }
}