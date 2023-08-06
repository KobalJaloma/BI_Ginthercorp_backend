export const PivoteCuentasLogicas = {
  '/': {
    'get': {
      'summary': 'Obtiene todos los pivotes registrados',
      'description': 'Obtiene los pivotes registrados',
      'tags' : ['Pivote_Cuentas_Logicas'],
      'responses': {
        '200': {
          'description' : 'Pivote extraido con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/Pivote_Cuentas_Logicas'" 
              }
            }
          }
        }
      }
    }
  },
  '/:id': {
    'get': {
      'summary': 'Obtiene la bitacora de cuentas logicas por id',
      'description': 'Obtiene la bitacora por id',
      'tags' : ['Pivote_Cuentas_Logicas'],
      'responses': {
        '200': {
          'description' : 'Bitacora extraida con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/Pivote_Cuentas_Logicas'" 
              }
            }
          }
        }
      }
    },
    'put': {
      'summary': 'Actualiza el pivote especificado por id',
      'description': 'Actualiza el pivote por id',
      'tags' : ['Pivote_Cuentas_Logicas'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          require: true,
          description: 'Identificador de registro a modificar',
        },
      ],
      'responses': {
        '200': {
          'description' : 'Bitacora extraida con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/Pivote_Cuentas_Logicas'" 
              }
            }
          }
        } 
      }
    },
  }
}