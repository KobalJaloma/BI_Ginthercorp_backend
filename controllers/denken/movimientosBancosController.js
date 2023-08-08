import { db_denken } from '../../config/db.js';
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllMovimientosBancos = async(req, res) => {
  const { key } = req.params;
  const { fechaI, fechaF, perfil, limit } = req.query;
  
  let periodos = helperPeriodos(fechaI, fechaF);
  let parametros;

  let query = `SELECT ${parametros || '*'} from movimientos_bancos
  ${periodos}
  order by id desc
  limit ${limit}`;
  
  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }

    const movimientos = await db_denken.query(query);

    res.json(movimientos[0]);

  } catch (error) {
    res.json(errorRes(error)); 
  }
}

//HELPERS DE QUERYS
const helperPeriodos = (fechaI, fechaF) => {
  //CONDICIONALES APRA ESTABLECER CONDICIONES DE FECHAS
  if(fechaI && fechaF) 
    return `WHERE fecha >= '${fechaI}' AND fecha <= '${fechaF}'`;
  if(fechaI) 
   return `WHERE fecha >= '${fechaI}'`;
  if(fechaF) 
    return `WHERE fecha <= '${fechaF}'`;
  
  return '';
}