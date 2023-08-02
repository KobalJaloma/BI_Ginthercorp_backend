export const usuariosRoutes = {
  '/usuarios': {
    'get': {
      'summary': 'Obtiene lista de los usuarios',
      'description': 'Obtiene la lista de todos los usuarios',
      'tags' : ['Usuarios'],
      'responses': {
        '200' : {
          'description' : 'usuarios obtenidos con exito',
          'content' : {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/Usuarios'" 
              }
            }
          }
        }
      }
    },
    'post': {
      'summary': 'crea un usuario',
      'description': 'crea un nuevo usuario en el sistema',
      'tags': ['Usuarios'],
      'requestBody': {
        'required' : true,
        'content': {
          'application/json': {
            'schema': {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer',
                  example: 200
                }, 
                'nombre': {
                  'type': 'string',
                  example: 'Luis'
                }, 
                'apellido': {
                  'type': 'string',
                  example: 'Garcia',
                }, 
                'usuario': {
                  'type': 'string',
                  example: 'Luis.Garcia',
                }, 
                'password': {
                  'type': 'string',
                  example: 'LU1sG4Rc1a',
                }, 
              }
            }
          }
        }
      },

      'responses': {
        '201': {
          'description':'Usuario creado con exito'
        },
        '400': {
          'description':'Error en la solicitud'
        },
      }
    }
  },
  '/usuarios/{:id}': {
    'get': {
      'summary': 'obtiene el usuario por el id',
      'description': 'obtiene el usuario por el id ingresado como parametro',
      'tags': ['Usuarios'],
      'responses':{
        '200': {
          'description': 'retorna un JSON con los datos especificados'
        }
      },
      'parameters': [
        {
          'name': 'id',
          'in': 'path',
          'description': 'Filtrado por id de la peticion',
          'required': true,
        },
        {
          'name': 'atributos',
          'in': 'query',
          'description': 'Filtrado de columnas en la peticion',
          'required': false,
        },
      ],
      'examples': {
        
      }
    }
  }
}