import { CatDepartamento } from "../../models/tickets/CatDepartamentosModel.js";
import { errorRes, failRes, successRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";

export const crearDepartamentos = async(req, res) => {
  try {
    const payload = req.body;
    
    await CatDepartamento.create(payload);

    res.json(successRes('El Departamento Se Creo Con Exito!'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const eliminarDepartamento = async(req, res) => {
  try {
    
    const departamentoId = req.params.departamento;
    
    await CatDepartamento.destroy({
      where: {
        id: departamentoId
      }
    });

    res.json(successRes('El Departamento Fue Eliminado Exitosamente'));

  } catch (error) {
    
  }
}

export const editarDepartamento = async(req, res) => {
  try {
    const departamentoMod = req.body;
    const departamentoId = req.params.departamento;

    await CatDepartamento.update(departamentoMod, {
      where: {
        id: departamentoId
      }
    });

    res.json(successRes(`Se Actualizo Con Exito El Departamento Con ID: ${departamentoId}`));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerDepartamentoId = async(req, res) => {
  try {
    const departamentoId = req.params.departamento;

    const departamento = await CatDepartamento.findAll({
      where: {
        id: departamentoId
      }
    });

    if(!departamento)
      return res.json(failRes(`No Se Encontro El Departamento Con El ID ${departamentoId}`))

    res.json(departamento);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerDepartamentos = async(req, res) => {
  try {
    const { atributos } = req.query;
    
    const departamentos = await CatDepartamento(atributosControl(atributos));

    if(!departamentos) 
      return res.json(failRes('No Se Encontraron Departamentos'));
    
    res.json(departamentos);

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const obtenerDepartamentosSucursal = async(req, res) => {
  try {
    const { atributos } = req.query;
    const sucursalId = req.params.sucursal;
    
    const departamentos = await CatDepartamento.findAll({
      where: {
        sucursal_id: sucursalId
      },
      ...atributosControl(atributos)
    })

    if(!departamentos) 
      return res.json(failRes(`No Se Encontrar Departamentos Asociados A Esta Sucursal Con ID: ${sucursalId}`));

    res.json(departamentos);

  } catch (error) {
    res.json(errorRes(error))
  }
}