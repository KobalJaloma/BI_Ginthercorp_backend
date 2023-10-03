import { Feedbacks } from "../../models/tickets/FeedbacksModel.js";
import { failRes, successRes, errorRes } from "../../types/responseTypes.js";


export const crearFeedback = async(req, res) => {
  try {

    const payload = req.body;

    await Feedbacks.create(payload);
    
    res.json(successRes('El Feedback Se Creo Con Exito'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const editarFeedback = async(req, res) => {
  try {
    const feedbackId = req.params.feedback;
    const feedbackMod = req.body;

    const feedbackInfo = await Feedbacks.findAll({
      where: {
        id: feedbackId
      }
    });

    if(!feedbackInfo) 
      return res.json(failRes(`No Se Encontro El Feedback Con El ID ${feedbackId}`));

    var payload = { ...feedbackInfo, ...feedbackMod };

    await Feedbacks.update(payload, {
      where: {
        id: feedbackId
      }
    });

    res.json(successRes('El Feedback Se Actualizo Exitosamente'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const eliminarFeedback = async(req, res) => {
  try {
    const feedbackId = req.params.feedback;

    await Feedbacks.destroy({
      where: {
        id: feedbackId
      }
    });

    res.json(successRes(`El Feedback ${feedbackId} Fue Eliminado Exitosamente`));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerFeedbacksTarea = async(req, res) => {
  try {
    const tareaId = req.params.tarea;

    const feedbacks = await Feedbacks.findAll({
      where: {
        tarea_id: tareaId
      }
    });

    if(!feedbacks)
      return res.json(failRes('No Se Encontro Ningun Feedback En Esta Tarea'));

    res.json(feedbacks);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const visto = async(req, res) => {
  try {
    const feedbackId = req.params.feedback; 

    const feedbackInfo = await Feedbacks.findAll({
      where: {
        id: feedbackId
      },
      limit: 1
    });
    
    var payload = { ...feedbackInfo[0], visualizado: 1 };
    
    await Feedbacks.update(payload, {
      where: {
        id: feedbackId
      }
    });

    res.json(successRes('El Feedback Se Visualizo Exitosamente!'));

  } catch (error) {
    res.json(errorRes(error))
  }
}