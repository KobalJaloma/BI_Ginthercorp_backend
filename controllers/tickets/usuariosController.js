import { Usuario } from "../../models/UsuariosModel.js";
import { errorRes, successRes, failRes, authErrorRes} from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";
import { encriptar } from "../../helpers/cifradoContrasena.js";


export const crearUsuario = async(req, res) => {
    try {
        const info = req.body;

        const passwordEncr = await encriptar(info.password);

        var payload = {...info, password: passwordEncr};

        const usuario = await Usuario.create(payload);

        if(!usuario) 
            return res.json(successRes('El Usuario Fue Creado Exitosamente'));

    } catch (error) {
        res.json(errorRes(error, 'Error Al Crear El Usuario'));
    }
}

export const editarUsuario = async(req, res) => {
    try {
        const newUsuario = req.body;
        const usuarioId = req.params.id;

        const usuario = await Usuario.update(newUsuario, {
            where: {
                id: usuarioId
            }
        });

        if(usuario)
            return res.json(successRes('El Usuario Se Edito Con Exito'));


    } catch (error) {
        res.json(errorRes(error, 'Error Al Editar El Usuario'))
    }
}

export const eliminarUsuario = async(req, res) => {
    try {
        
        const usuarioId = req.params.id; 

        if(!usuarioId)
            return res.json(errorRes('Invalid ID', 'El Id Es invalido o no se envio en el parametro')) 

        await Usuario.destroy({
            where: {
                id: usuarioId
            }
        });

        return res.json(successRes(`El Usuario "${usuarioId}" A Sido Eliminado Completamente`));

    } catch (error) {
        res.json(errorRes(error, 'Error Al Eliminar El Usuario'));
    }
}

export const obtenerUsuarioId = async(req, res) => {
    try {
        const usuarioId = req.params.id;

        const usuarios = await Usuario.findAll({
            where: {
                id: usuarioId
            }
        });

        if(!usuarios) 
            return res.json(failRes(`No se Encontro Ningun Usuario Con El ID: ${usuarioId}`)); 

        res.json(usuarios);

    } catch (error) {
        res.json(errorRes(error));
    }
}

export const obtenerUsuarios = async(req, res) => {
    try {
        const { atributos } = req.query;

        const usuarios = await Usuario.findAll(atributosControl(atributos));

        if(!usuarios) 
            return res.json(failRes('No Se Encontraron Los Usuarios'))

        res.json(usuarios);

    } catch (error) {
        res.json(errorRes(error))
    }
}

export const obtenerUsuariosDepartamento = async(req, res) => {
    try {
        const departamentoId = req.params.id;
        const { atributos } = req.query;

        const usuarios = await Usuario.findAll({
            ...atributosControl(atributos),
            where: {
                id: departamentoId
            }
        });

        if(!usuarios)
            return res.json(failRes('No Se Encontraron Usuarios'));

        res.json(usuarios);

    } catch (error) {
        res.json(errorRes(error));
    }
}

export const renovarContrasena = async(req, res) => {
    try {
        const usuarioId = req.params.id;
        const { password } = req.body;

        const passwordEncr = await encriptar(password);
    
        const usuarioInfo = await Usuario.findAll({
            where: {
                id: usuarioId
            }
        });

        var payload = usuarioInfo[0];

        payload = {...payload, password: passwordEncr};

        const newPass = await Usuario.update(payload, {
            where: {
                id: usuarioId
            }
        });

        if(!newPass) 
            return res.json(failRes('La contrasena no pude ser actualizada'));

        res.json(successRes('Contrasena actualizada con exito'));
    
    } catch (error) {
        res.json(errorRes(error));
    }
}

export const desactivarUsuario = async(req, res) => {
    try {
        const usuarioId = req.params.id;

        const usuarioInfo = await Usuario.findAll({
            where: {
                id: usuarioId
            }
        });

        var payload = {...usuarioInfo[0], activo: 0};

        await Usuario.update(payload, {
            where: {
                id: usuarioId
            }
        })

        res.json(successRes('El Usuario Se Desactivo Exitosamente!'));

    } catch (error) {
        res.json(errorRes(error))
    }
}

export const authUsuario = () => {
    try {
        //pendiente
    } catch (error) {
        res.json(errorRes(error))
    }
}