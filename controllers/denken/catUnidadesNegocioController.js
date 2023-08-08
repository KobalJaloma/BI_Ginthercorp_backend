import { db_denken } from "../../config/db.js";
import { autenticar } from "../../helpers/autenticacion.js";
import { authErrorRes, successRes, errorRes } from "../../types/responseTypes.js";

export const getAllUnidadesNegocio = async(req, res) => {
  const { perfil } = req.query;
  let atributosQuery;

  switch (perfil) {
    case '1':
      atributosQuery = 'id, clave, nombre, descripcion';
      break;
    default:
      break;
  }

  let query = `SELECT ${ atributosQuery || '*' } FROM cat_unidades_negocio`;
  
  try {
    const unidades = await db_denken.query(query);

    res.json(unidades[0]);    
  } catch (error) {
    res.json(errorRes(error));
  }
};