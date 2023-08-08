import { db_denken } from '../../config/db.js';
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { autenticar } from "../../helpers/autenticacion.js";

//EXPORTS PARA ENDPOINTS
export const getAllCxc = async(req, res) => {
  const { limit , perfil, fechaI, fechaF } = req.query;
  let atributos;
  let condicionFecha = helperPeriodos(fechaI, fechaF); //Se extrae codigo query para perdiodos, funciin en este archivo
  console.log("este es el perfil: " + perfil);
  switch (parseInt(perfil)) {
    case 1:
      atributos = 'id, id_unidad_negocio, id_sucursal, id_factura, fecha, subtotal, iva, total, estatus';
      break;
    default:
      break;
  }

  let query = `SELECT ${atributos || '*'} from cxc
  ${condicionFecha}
  order by id desc
  limit ${limit || 1000};`;

  try {

    const cxc = await db_denken.query(query);

    res.json(cxc[0]);
    
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
