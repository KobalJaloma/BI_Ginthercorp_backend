import { Usuario } from "../../models/UsuariosModel.js";
import { successRes, errorRes, failRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { autenticar } from "../../helpers/autenticacion.js";
import { evaluarPassword, encriptar } from "../../helpers/cifradoContrasena.js";


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

export const autenticarUsuario = async(req, res) => {
    const { user, password } = req.query;

    if(!user || !password) 
        return res.json(errorRes('','No se encontraron los campos obligatorios'));

    try {
        const findUser = await Usuario.findAll({
            where: {
                usuario: user
            }
        });

        if(findUser.length <= 0) 
            return res.json(failRes('Peticion Erronea, Usuario No Encontrado', 'USER'));
        
        if(!findUser[0].password) 
            return res.json(failRes('Peticion Erronea, No Se Encontro Informacion De Contrasena', 'PASSWORD'));

        //DEVUELVE UN TYPE DE RESPUESTA OK O FAIL, CON STATUS Y MESSAGE
        const evaluar = evaluarPassword(password ,findUser[0].password);

        return res.json(evaluar);
        
    } catch (error) {
        res.json(errorRes(error));
    }
}

//CREATES

export const createUsuario = async(req, res) => {
    try {
        console.log("Este es el body " + JSON.stringify(req.body));
        var payload = req.body;

        const peticion = await Usuario.findAll({
            where: {
                usuario: payload.usuario
            }
        });

        if(peticion.length > 0)
            return res.json(errorRes('', 'El Nombre De Usuario Ya Esta Existente, Intente Con Otro'));
        
        const password = payload.password;
        const hash = await encriptar(password);

        payload = {...payload, password: hash};

        const usuario = await Usuario.create(payload);

        res.json(successRes('Tu Usuario Fue Creado Con Exito'));
    } catch (error) {
        res.json(errorRes(error, 'Hubo Un Error Al Intentar Crear El Usuario'))
    }
};

