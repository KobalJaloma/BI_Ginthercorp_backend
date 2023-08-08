import { TipoMovimientosBanco } from "../../models/CatTipoMovimientosBancoModel.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllTipos = async(req, res) => {
  const { atributos } = req.query;
  
  try {
    const tipo = await TipoMovimientosBanco.findAll(atributosControl(atributos));
    
    res.json(tipo);
  } catch (error) {
    res.json(errorRes(error, 'Hubo Un Error Al Extraer Los Tipos'));
  }
}


export const getTiposMovimientosById = async(req, res) => {
  const { id } = req.params;
  const { atributos } = req.query;
  
  //sentencias de filtrdo
  const sentencia = { where: { id: id } };
  var queryparam = {...sentencia, ...atributosControl(atributos)};
  
  try {
    const tipos = await TipoMovimientosBanco.findAll(queryparam);

    //validar si extrajo algun valor
    if(!tipos) {
      res.json(errorRes('NOT FOUND', 'Tipo De Movimiento No Encontrado'));
      return;
    }
    res.json(tipos);

  } catch (error) {
    res.json(errorRes(error, 'Hubo Un Error Al Encontrar El Tipo De Movimiento'));
  }
}

//creates
export const createTipoMovimnto = async(req, res) => {
  const { key } = req.params;
  
  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const tipo = await TipoMovimientosBanco.create();
    
    res.json(successRes('Se Creo Correctamente El Tipo De Movimientos'));
  } catch (error) {
    res.json(errorRes(error, 'Hubo Un Error Al Crear El Tipo De Movimiento - SERVER'));
  }
}