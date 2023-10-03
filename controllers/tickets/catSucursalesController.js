import { CatSucursal } from "../../models/tickets/CatSucursalesModel.js";
import { failRes, errorRes, successRes } from "../../types/responseTypes.js";
import { atributosControl } from "../../types/sequelizeControl.js";

export const crearSucursal = async(req, res) => {
  try {
    const payload = req.body;
    
    await CatSucursal.create(payload);

    res.json(successRes('Se Creo La Sucursal Correctamenta'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const eliminarSucursal = async(req, res) => {
  try {
    const sucursalId = req.params.sucursal;
    
    await CatSucursal.destroy({
      where: {
        id: sucursalId
      }
    });
    
    res.json(successRes(`La Sucursal Con El ${sucursalId} Ha Sido Eliminada`));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const editarSucursal = async(req, res) => {
  try {
    const sucursalId = req.params.sucursal;
    const sucursalMod = req.body;
    
    const sucursalInfo = await CatSucursal.findAll({
      where: {
        id: sucursalId
      }
    });

    var payload = {...sucursalInfo[0], ...sucursalMod};

    await CatSucursal.update(payload, {
      where: {
        id: sucursalId
      }
    });

    res.json(successRes('La Sucursal Fue Exitosamente Editada'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const obtenerSucursalId = async(req, res) => { 
  try {
    const sucursalId = req.params.sucursal;

    const sucursal = await CatSucursal.findAll({
      where: {
        id: sucursalId
      }
    });

    if(!sucursal)
      return res.json(failRes(`No Se Encontraron Sucursales Con El Id ${sucursalId}`));

    res.json(sucursal);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const obtenerSucursales = async(req, res) => {
  try {
    const { atributos } = req.query;

    const sucursales = await CatSucursal.findAll(atributosControl(atributos));

    if(!sucursales)
      return res.json(failRes('No Se Encontraron Sucursales'));

    res.json(sucursales)
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const obtenerSucursalesEmpresa = async(req, res) => {
  try {
    const empresaId = req.params.empresa;
    const { atributos } = req.query;

    const sucursales = await CatSucursal.findAll({
      ...atributosControl(atributos),
      where: {
        empresa_id: empresaId
      }
    });

    if(!sucursales)
      return res.json(failRes('No Se Encontraron Sucursales'));

    res.json(sucursales);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const desactivarSucursal = async(req, res) => {
  try {
    const sucursalId = req.params.id;

    const sucursalInfo = await CatSucursal.findAll({ 
      where: {
        id: sucursalId
      }
    });

    var payload = {...sucursalInfo[0], activo: 0};

    await CatSucursal.update(payload, {
      where: {
        id: sucursalId
      }
    });
    
    res.json(successRes('La Sucursal Se desactivo Correctamente'));

  } catch (error) {
    res.json(errorRes(error));
  }
}