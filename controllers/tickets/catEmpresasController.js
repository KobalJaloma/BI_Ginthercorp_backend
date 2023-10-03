import { CatEmpresas } from "../../models/tickets/CatEmpresasModel.js";
import { CatSucursal } from "../../models/tickets/CatSucursalesModel.js";
import { successRes, errorRes, failRes } from "../../types/responseTypes.js";

export const crearEmpresa = async(req, res) => {
  try {
    
    const empresa = req.body;

    await CatEmpresas.create(empresa);

    res.json(successRes('La Creacion De La Empresa Fue Exitosa'));

  } catch (error) {
    res.json(errorRes(error))
  }
}

export const eliminarEmpresa = async(req, res) => {
  try {
    const empresaId = req.params.empresa;

    await CatEmpresas.destroy({
      where: {
        id: empresaId
      }
    })

    res.json(successRes('La Empresa Se Elimino Con Exito'));

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const editarEmpresa = async(req, res) => {
  try {
    const empresaId = req.params.empresa;
    const empresaMod = req.body;
    
    const empresaInfo = await CatEmpresas.findAll({
      where: {
        id: empresaId
      }
    });

    if(!empresaInfo) 
      return res.json(failRes(`No Se Encontro La Empresa A Modificar Con El ID ${empresaId}`));

    var payload = { ...empresaInfo, ...empresaMod };

    await CatEmpresas.update(payload);

    res.json(successRes('La Empresa Se Edito Exitosamente!'));
  
  } catch (error) {
    res.json(errorRes(error));
  }
}

export const obtenerEmpresaId = async(req, res) => {
  try {
    const empresaId = req.params.empresa;

    const empresas = await CatEmpresas.findAll({
      where: {
        id: empresaId
      }
    });

    if(!empresas) 
      return res.json(failRes(`No Se Encontro La Empresa Con El ID ${empresaId}`));

    res.json(empresas);

  } catch (error) {
    res.json(errorRes(error));
  }
}

export const desactivarEmpresa = async(req, res) => {
  try {
    const empresaId = req.params.empresa;

    await CatEmpresas.update({activo: 0}, {
      where: {
        id: empresaId
      }
    })

    await CatSucursal.update({activo: 0}, {
      where: {
        empresa_id: empresaId
      }
    });

    res.json(successRes('La empresa y las sucursales asociadas se desactivaron'));

  } catch (error) {
    res.json(errorRes(error));
  }
}
