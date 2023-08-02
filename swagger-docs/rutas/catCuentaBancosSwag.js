export const catCuentaBancosRoutes = {
  '/': {
    'get': {
      'summary': 'Obtiene el catalogo de las cuentas de banco',
      'description': 'Obtiene el catalogo completo de los clientes',
      'tags' : ['Catalogo Cuentas de Banco'],
      'responses': {
        '200': {
          'description' : 'Catalogo extraido con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/CatCuentasBancos'" 
              }
            }
          }
        }
      }
    },
    'post': {
      'summary': 'Crea un registo nuevo en el catalogo de las cuentas de banco',
      'description': 'Crea cuenta de banco en el catalogo',
      'tags' : ['Catalogo Cuentas de Banco'],
      'requestBody' : {
        'required': true,
      },
      'responses': {
        '201': {
          'description':'cuenta de banco creada con exito'
        },
        '400': {
          'description':'Error en la solicitud'
        }
      }
    }
  },
  '/{:id}': { 
    'get': {
      'summary': 'obtiene la cuenta de banco por el id',
      'description': 'obtiene la cuenta de banco por el id ingresado como parametro',
      'tags': ['Catalogo Cuentas de Banco'],
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