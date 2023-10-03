import { Comentario } from "../../models/tickets/ComentariosModel.js";
import { failRes, errorRes, successRes } from "../../types/responseTypes.js";

export const crearComentario = async(req, res) => {
  try {
    const payload = req.body;

    await Comentario.create(payload);

    res.json(successRes('Se Creo Correctamente El Comentario'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const editarComentario = async(req, res) => {
  try {
    const comentarioId = req.params.comentario;
    const { mensaje } = req.body;

    if(!mensaje)
      return res.json(failRes('El Campo mensaje en el body es requerido'));

    await Comentario.update({ mensaje: mensaje }, {
      where: {
        id: comentarioId
      }
    });

    res.json(successRes('El Comentario Se Actualizo Correctamente'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const eliminarComentario = async(req, res) => {
  try {
    const comentarioId = req.params.comentario;

    await Comentario.destroy(comentarioId);

    res.json(successRes('El Comentario Se Elimino Con Exito'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerComentariosTarea = async(req, res) => {
  try {
    const tareaId = req.params.tarea;

    const comentarios = await Comentario.findAll({
      where: {
        tarea_id: tareaId
      }
    });

    if(!comentarios)
      return res.json(failRes('No Se Encontraron Comentarios'));

    res.json(comentarios);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const subirLike = async(req, res) => {
  try {
    const comentarioId = req.params.comentario;
    const { usuario } = req.query;

    const likesInfo = await Comentario.findAll({
      attributes: ['likes', 'likes_usuarios'],
      where: {
        id: comentarioId
      }
    });

    var likesNum = parseInt(likesInfo[0].likes) + 1;
    var likesUsuarios = []; 

    if(likesInfo[0].likes_usuarios)
      likesUsuarios = (likesInfo[0].likes_usuarios).split(',');
    
    likesUsuarios.push(usuario);
      
    await Comentario.update({ likes: likesNum, likes_usuarios: likesUsuarios.toString()}, {
      where: {
        id: comentarioId
      }
    });

  } catch (error) {
    res.json(errorRes(error))
  }
}