import { CatCuentasBancos } from "../../models/CatCuentasBancosModel.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";


export const getAllCuentas = async(req, res) => {
  const { atributos } = req.query;
  const { key } = req.params;
  
  try {
    //AUTENTICACION DEL CIFRADO
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const cuentas = CatCuentasBancos.findAll(atributosControl(atributos));

    res.json(cuentas);
  } catch (error) {
    errorRes(error, "Ocurrio un error al obtener el catalogo")
  }
}

export const getCuentasByid = async(req, res) => {
  const { atributos } = req.query;
  const { key, id } = req.params;

  const sentencia = { where: {id: id} };
  var parametros = {...atributosControl(atributos) , ...sentencia};
  
  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const cuenta = CatCuentasBancos.findAll(parametros);
    
    res.json(cuenta);
  } catch (error) {
    res.json(errorRes(error, 'Ocurrio Un Error Al Obtener Informacion'))
  }
}

export const createCuentas = async(req, res) => {
  const { key } = req.params;
  const payload = req.body;

  if(!payload) {
    res.json( errorRes('Body Params', 'No Se Envio El Payload Correctamente') );
    return;
  }

  try {
    //AUTENTICACION
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const cuenta = CatCuentasBancos.create(payload);

    successRes('Se creo la cuenta exitosamente');
    
  } catch (error) {
    res.json(errorRes(error, 'Fallo la peticion del catalogo de cuentas'));    
  }

}
