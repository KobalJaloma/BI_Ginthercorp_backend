import { db_denken } from "../../config/db.js";
import { autenticar } from "../../helpers/autenticacion.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";

export const getAllSucursales = async(req, res) => {
  const { key } = req.params;
  const { perfil } = req.query;
  let atributos;
  
  switch (perfil) {
    case '1':
      atributos = 'id_sucursal, id_compania, descr';
      break;
    default:
      break;
  }

  let query = `SELECT ${atributos || '*'} FROM sucursales where activo = '1';`;
  // let query = `SELECT * FROM sucursales where activo = '1';`;
  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }
    const sucursales = await db_denken.query(query);
    
    res.json(sucursales[0]);

  } catch (error) {
    res.json(errorRes(error))
  }
} 

export const getSucursalById = async(req, res) => {
  const { key, id } = req.params;
  const { perfil } = req.query;
  let atributos;
  
  switch (perfil) {
    case '1':
      atributos = 'id_sucursal, id_compania, descr';
      break;
    default:
      break;
  }

  if(!id) {
    res.json(errorRes('', 'No Se Encontro El Id En Los Paramatros De La Url'));
    return;
  }
  
  let query = `SELECT ${atributos || '*'} FROM sucursales WHERE activo = '1' AND id_sucursal = '${id}';`;

  try {
    const auth = await autenticar(key);
    if(auth) {
      res.json(authErrorRes());
      return;
    }

    const sucursales = await db_denken.query(query);

    res.json(sucursales[0]);
  } catch (error) {
    res.json(errorRes(error));
  }
}