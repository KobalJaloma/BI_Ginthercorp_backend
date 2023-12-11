import { Tarea } from "../../models/tickets/TareasModel.js";
import { errorRes, failRes, successRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";

export const crearTarea = async(req, res) => {
  try {
    const payload = req.body;


    await Tarea.create(payload);
    
    res.json(successRes('Tarea Creada Correctamente!'));
    
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const editarTarea = async(req, res) => {
  try {
    const tareaMod = req.body;
    const tareaId = req.params.usuario;

    await Tarea.update(tareaMod, {
      where: {
        id: tareaId
      }
    });

    res.json(successRes('La Tarea Se Edito Correctamente'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const obtenerTareasId = async(req, res) => {
  try {

    const tareaId = req.params.tarea;

    const tarea = await Tarea.findAll({
      where: {
        id: tareaId
      }
    });

    if(!tarea)
      return res.json(failRes(`No Se Encontro Tarea Con El ID: ${tareaId}`));

    res.json(tarea);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerTareasUsuario = async(req, res) => {
  try {
    const { atributos} = req.query;
    const usuarioId = req.params.usuario;

    const tareas = await Tarea.findAll({
      where: {
        usuario_demandado: usuarioId
      },
      ...atributosControl(atributos)
    });

    if(!tareas)
      return res.json(failRes('No Se Encontraron Tareas O Ocurrio Un Error inesperado'));
    
    res.json(tareas);

  } catch (error) {
    res.json(error)
  }
}

export const obtenerTareasDepartamento = async(req, res) => {
  try {
    const departamentoId = req.params.departamento;
    const { finalParcial, finalTotal } = req.query;

    const isFinalizadaParcial = () => finalParcial ? { finalizada_demandado: 1 } : '';
    const isFinalizadaTotal = () => finalTotal ? { finalizada_demandante: 1 } : '';


    const Tareas = await Tarea.findAll({
      where: {
        departamento_id: departamentoId,
        ...isFinalizadaParcial(),
        ...isFinalizadaTotal(),
      }
    });

    if(!Tareas)
      return res.json(failRes(`No Se Encontro Ninguna Tarea En El Departamento ${departamentoId}`));

    res.json(Tareas);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerTareasSucursal = async(req, res) => {
  try {
    const sucursalId = req.params.sucursal;
    const { finalParcial, finalTotal } = req.query;

    const isFinalizadaParcial = () => finalParcial ? { finalizada_demandado: 1 } : '';
    const isFinalizadaTotal = () => finalTotal ? { finalizada_demandante: 1 } : '';

    const tareas = await Tarea.findAll({
      where: {
        sucursal_id: sucursalId,
        ...isFinalizadaParcial(),
        ...isFinalizadaTotal(),
      }
    });

    if(tareas)
      return res.json(failRes(`No Se Encontraron Tareas En La Sucursal ${sucursalId}`));

    res.json(tareas);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const actualizarProgreso = async() => {
  try {
    const tareaId = req.params.tarea;
    const { progreso } = req.body;

    await Tarea.update({ progreso: progreso }, {
      where: {
        id: tareaId
      }
    });

    res.json(successRes(`Se Actualizo El Progreso De La Tarea Con ID ${tareaId}`));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const preFinalizar = async(req, res) => {
  try {
    const tareaId = req.params.tarea;
    
    await Tarea.update({ finalizada_demandado: 1 }, {
      where: {
        id: tareaId
      }
    });

    res.json(successRes(`Se Pre Finalizo La Tarea Con ID ${tareaId}`));
  } catch (error) {
    res.json(errorRes(error));
  }
}