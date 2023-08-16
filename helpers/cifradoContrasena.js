import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { failRes, successRes } from "../types/responseTypes.js";

const round = 10;

export const encriptar = async(password) => {
  const salt = await genSaltSync(round);
  const hash = await hashSync(password, salt);
  
  return hash;
}

//Compara la contraseña cifrada con la existente
export const evaluarPassword = (password, hash) => {

  const match = compareSync(password, hash);

  return match 
  ? successRes('Usuario Autenticado') 
  : failRes('Usuario No Autenticado, Contraseña Erronea', 'PASSWORD') 
}


