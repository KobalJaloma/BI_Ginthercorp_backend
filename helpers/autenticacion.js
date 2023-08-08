import { Connection } from "../models/ConnectionModel.js";

export const autenticar = async(key) => {
    //se retorna true porque la intencion es evaluar si no tiene clave
    if(key == '') return true;
  
    try {
      const keys = await Connection.findAll({
        where: {
          key: key
        }
      });
      //retorna true si la clave no es correcta y false si, si lo es
      return (!(keys.length > 0)); //regresa un boolean
      
    } catch (error) {
      console.log(error);     
    }
};
