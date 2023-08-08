import { Usuario } from "../../models/UsuariosModel.js";
import { successRes, errorRes, authErrorRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";


//GETS
export const getAllUsuarios = async(req, res) => {
    try {
        const { atributos } = req.query;

        const usuarios = await Usuario.findAll(atributosControl(atributos));
        res.json(usuarios);

    } catch (error) {
        res.json(errorRes(error, 'Usuarios no encontrados'));
    }
}

export const getUsuarioById = async(req, res) => {
    const id = req.params.id;
    const { atributos } = req.query;

    console.log(req.params.key);
    console.log(JSON.stringify(req.params));

    // EVALUAR SI EL ID EXISTE
    if(!id) {
        res.json(errorRes({}, 'El id no fue recibido de forma correcta'));
        return;
    }   

    //variables para control del query de sequelize
    const condicionConf = { where: { id: id } };
    //SE UNIFICAN LAS PETICIONES EN EL QUERY
    const condicionesSeq = {...atributosControl(atributos), ...condicionConf};  

    try {
        const usuario = await Usuario.findAll(condicionesSeq);
        
        res.json(usuario);
    } catch (error) {
        res.json(errorRes(error, 'No se encontro el usuario o su id es incorrecto'));
    }
};

//CREATES

export const createUsuario = async(req, res) => {
    try {
        const usuario = Usuario.create(req.body);

        res.json(successRes('Tu Usuario Fue Creado Con Exito'));
    } catch (error) {
        res.json(errorRes(error, 'Hubo Un Error Al Intentar Crear El Usuario'))
    }
};