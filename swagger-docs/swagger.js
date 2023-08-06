import { ruta } from "./testSwag.js";
import { 
  usuariosRoutes, conectionRoute, catCuentaBancosRoutes, 
  BitacoraCuentasCompromisos, BitacoraCuentasLogica, BitacoraCuentasPromesas, PivoteCuentasCompromisos,
  PivoteCuentasLogicas, PivoteCuentasPromesas, PivoteCuentasReales
} from "./rutas/index.js";
import { usuariosSchema, connectionSchema, catCuentasBancos, catTipoMovimientoSchema } from "./schemas/index.js";
//MODULOS DE DOCUMENTACION - JSON - SWAGGER
export const swagger = {
  "openapi": "3.0.0",
  "info": {
    "title": "BI_Ginthersoft",
    "version": "0.1.0",
    "description": "Backend del sistema BI"
  },
  "paths": {
    // ...ruta,
    ...usuariosRoutes,
    ...conectionRoute,
    ...catCuentaBancosRoutes,
  },
  "components" : {
    "schemas" : {
      ...usuariosSchema,
      ...connectionSchema,
      ...catCuentasBancos,
      ...catTipoMovimientoSchema,
      ...BitacoraCuentasCompromisos,
      ...BitacoraCuentasLogica,
      ...BitacoraCuentasPromesas,
      ...PivoteCuentasCompromisos,
      ...PivoteCuentasLogicas,
      ...PivoteCuentasPromesas,
      ...PivoteCuentasReales,
    }
  }
}