import { Usuario } from "../models/UsuariosModel.js";
import { successRes, errorRes } from "../types/responseTypes.js";
import { atributosControl } from "../types/sequelizeControl.js";

//GETS
export const getAllUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        
        res.json(usuarios);

    } catch (error) {
        res.json(errorRes(error, 'Usuarios no encontrados'));
    }
}

export const getUsuarioById = async(req, res) => {
    const id = req.params.id;
    const { atributos } = req.query;
    var atrArray;
    
    //EVALUAR SI EXISTE ATRIBUTOS
    if(atributos) {
        atrArray = atributos.split(','); //separa por cada como un elemento array
    }
    // EVALUAR SI EL ID EXISTE
    if(!id) {
        res.json(errorRes({}, 'El id no fue recibido de forma correcta'));
        return;
    }   

    //variables para control del query de sequelize
    const condicionConf = { where: { id: id } };
    //SE EVALUA SI EXISTEN ATRIBUTOS PARA PODER FILTRAR LAS OPCIONES
    const condicionesSeq = atrArray ? {...atributosControl(atrArray), ...condicionConf} : condicionConf;  

    try {
        const usuario = await Usuario.findAll(condicionesSeq);
        
        res.json(usuario);
    } catch (error) {
        res.json(errorRes(error, 'No se encontro el usuario o su id es incorrecto'));
    }
}

//CREATES

export const createUsuario = async(req, res) => {
    try {
        const usuario = Usuario.create(req.body);

        res.json(successRes('Tu Usuario Fue Creado Con Exito'));
    } catch (error) {
        res.json(errorRes(error, 'Hubo Un Error Al Intentar Crear El Usuario'))
    }
}