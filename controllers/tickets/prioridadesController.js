import { CatPrioridad } from "../../models/tickets/CatPrioridadesModel.js";
import { failRes, successRes, errorRes } from "../../types/responseTypes.js";

export const crearPrioridades = async(req, res) => {
  try {
    const payload = req.body;

    await CatPrioridad.create(payload);

    res.json(successRes('La Prioridad Se Registro Exitosamente'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const editarPrioridades = async(req, res) => {
  try {
    const prioridaesNivel = req.params.prioridad;
    const prioridadesMod = req.body;

    const prioridadInfo = await CatPrioridad.findAll({
      where: {
        nivel: prioridaesNivel
      }
    });

    var payload = { ...prioridadInfo[0], ...prioridadesMod };

    await CatPrioridad.update(payload, {
      where: {
        nivel: prioridaesNivel
      }
    })

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const eliminarPrioridades = async(req, res) => {
  try {
    const prioridadNivel = req.params.prioridad;

    await CatPrioridad.destroy({
      where: {
        nivel: prioridadNivel
      }
    });

    res.json(successRes('La Prioridad Fue Eliminada Con Exito'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerNivelesCategoria = async(req, res) => {
  try {
    const categoriaId = req.params.categoria;

    const niveles = await CatPrioridad.findAll({
      where: {
        categoria: categoriaId
      }
    });

    if(!niveles)
      return res.json(failRes('No Se Encontraron Niveles'));

    res.json(niveles);

  } catch (error) {
    res.json(errorRes(error));
  }
}