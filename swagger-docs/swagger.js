import { ruta } from "./testSwag.js";
import { usuariosRoutes, conectionRoute } from "./rutas/index.js";

//MODULOS DE DOCUMENTACION - JSON - SWAGGER
export const swagger = {
  "openapi": "3.0.0",
  "info": {
    "title": "Mi API",
    "version": "1.0.0",
    "description": "Descripción de mi API"
  },
  "paths": {
    ...ruta,
    ...usuariosRoutes,
    ...conectionRoute
  },
  "components" : {
    "schemas" : {
      "Connection" : {
        "type" : 'object',
        "required": ['key', 'id'],
        "properties" : {
          "id" : {
            "type" : "integer",
            "description" : 'Clave unica, autoincremental'
          },
          "key" : {
            "type" : "string",
            "description" : 'Cifrado para enlazar conexion.'
          },
        }
      }
    }
  }
}