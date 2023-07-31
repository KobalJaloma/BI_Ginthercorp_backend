import { Connection } from "../models/ConnectionModel.js";

export const autenticar = async(key, res) => {
    try {
      const keys = await Connection.findAll({
        where: {
          key: key
        }
      });
      if(keys) {  
        res.json({
          status: 'OK',
          message: 'Key encontrada'
        });
      }
      res.json({
        status: 'FAIL',
        message: 'Key no encontrada'
      });
    } catch (error) {
      res.json({
        status: 'FAIL',
        message: 'Ocurrio un error en el Sistema.'
      });     
    }
};
