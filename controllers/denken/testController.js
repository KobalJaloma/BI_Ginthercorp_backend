import { db_denken } from "../../config/db.js";
import { authErrorRes, errorRes, successRes } from "../../types/responseTypes.js";

export const testDenken = async(req, res) => {
  // const query = `SELECT * FROM sucursales LIMIT 300;`;
  const query = `SELECT id FROM almacen_d LIMIT 50000;`;

  try {
    const response = await db_denken.query(query);
    // const resultados = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
    res.json(response);

  } catch (error) {
    res.json(errorRes(error, 'Hubo un problema'));
  }
}

export const testDenken2 = async(req, res) => {
  const query = 'SELECT id FROM ';
  

  try {
    const response = await db_denken.query();


  } catch (error) {
    
  }
}