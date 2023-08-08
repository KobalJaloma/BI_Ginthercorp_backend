import { db_denken } from "../../config/db.js";
import { autenticar } from "../../helpers/autenticacion.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";

export const getAllFacturas = async(req, res) => {
  const { limit, fechaI, fechaF, perfil } = req.query;
  let condicionPeriodo = helperPeriodos(fechaI, fechaF);
  let parametros;
  switch (parseInt(perfil)) {
    case 1:
      parametros = 'id, id_unidad_negocio, id_sucursal, observaciones, porcentaje_iva, subtotal, iva, total, fecha_inicio, fecha_fin';
      break;
    default:
      break;
  }

  let query = `SELECT ${ parametros || '*' } FROM facturas
  ${condicionPeriodo}
  order by id desc
  limit ${limit || 1000}`;

  try {
    const facturas = await db_denken.query(query);

    res.json(facturas);

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