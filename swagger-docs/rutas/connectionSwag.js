export const conectionRoute = {
  '/connect': {
    'get': {
      'summary': 'obtiene las claves cifradas',
      'description': 'obtiene las listas de las claves cifradas',
      'tags': ['Conections'],
      'parameters': [{
        'name':'atributos',
        'in':'query',
        'required': false,
        'description': 'se utiliza para filtrar las columnas de la tabla de conexiones',
        'schema': {
          'type': 'array',
          'items': {
            'type': 'string'
          },
          'style': 'form',
          'examples': {
            'unAtributo': {
              'summary': 'Ejemplo de un solo atributo',
              'value': '[nombre] # ?atributos=nombre'
            },
            'multipleAtributos': {
              'summary': 'Ejemplo de multiples atributos',
              'value': '[nombre, apellido, key] # ?atributos=nombre,apellidos,key'
            }
          }
        }
      }],
      'response': {
        '200': {
          'description': 'Claves obtendias con exito',
          'content': {
            'application/json': {
              'schema': {
                'type': 'json',
                'items': '#/components/schemas/Connection'
              }
            }
          }
        }
      }
    },
    'post': {
      'summary': 'crear claves cifradas',
      'description': 'crear listas de las claves cifradas',
      'tags': ['Conections'],
      'requestBody': {
        'content': {
          'application/json': {
            'schema': {
              'type': 'object',
              'properties': {
                'id': {
                  'type': 'integer',
                },
                'key': {
                  'type': 'string'
                }
              }
            }
          }
        }
      },
      'response': {
        '201': {
          'description' : 'cifrado creado correctamente'
        },
        '400': {
          'type':'error en un cifrado'
        }
      }
    }
  }
}