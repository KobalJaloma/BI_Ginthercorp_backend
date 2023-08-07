import { db_denken } from '../../config/db.js';
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";
import { autenticar } from "../../helpers/autenticacion.js";

export const getAllCxc = async(req, res) => {
  const { key } = req.params;
  const { limit , perfil } = req.query;
  let atributos;


  switch (perfil) {
    case '1':
      atributos = '';
      break;
    default:
      break;
  }
  
  let query = `SELECT ${atributos || '*'} from cxc
  order by id desc
  limit ${limit || 1000};`;

  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }

    const cxc = await db_denken.query(query);

    res.json(cxc);
    
  } catch (error) {
    res.json(errorRes(error));
  }
}