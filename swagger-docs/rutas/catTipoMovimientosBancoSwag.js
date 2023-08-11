export const catTipoMovimientosRoutes = {
  '/cat_tipo_movimientos': {
    'get': {
      'summary': 'Obtiene el catalogo de los tipos de movimientos de banco',
      'description': 'Obtiene el catalogo de los tipos de movimientos',
      'tags' : ['CatalogoTiposDeMovimientos'],
      'responses': {
        '200': {
          'description' : 'Catalogo extraido con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/CatalogoTiposDeMovimientos'" 
              }
            }
          }
        }
      }
    },
    'post': {
      'summary': 'Crea un registo nuevo en el catalogo de los tipos de movimientos',
      'description': 'Crea un nuevo tipo de movimiento',
      'tags' : ['CatalogoTiposDeMovimientos'],
      'requestBody' : {
        'required': true,
      },
      'responses': {
        '201': {
          'description':'Respuesta exitosa'
        },
        '400': {
          'description':'Error en la solicitud'
        }
      }
    }
  },
  '/cat_tipo_movimientos/{:id}': { 
    'get': {
      'summary': 'obtiene el tipo de movimiento por el id',
      'description': 'obtiene el tipo de movimiento por el id ingresado como parametro',
      'tags': ['CatalogoTiposDeMovimientos'],
      'responses':{
        '200': {
          'description': 'retorna un JSON con los datos especificados'
        }
      },
      'parameters': [
        {
          'name': 'id',
          'in': 'path',
          'description': 'Filtrado de id en la tabla a consultar',
          'required': true,
          'example': 'localhost/api/catcuentasbancos/sdsasdwersade/100'
        },
        {
          'name': 'atributos',
          'in': 'query',
          'description': 'Filtrado de columnas en la peticion',
          'required': false,
          'example': 'localhost/api/catcuentasbancos/sdsasdwersade/100?atributos=cuenta,id'
        },
      ]
    }
  } 
};