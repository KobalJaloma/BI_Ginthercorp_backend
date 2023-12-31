export const BitacoraCuentasPromesas = {
  '/BitacoraCuentaLogica': {
    'get': {
      'summary': 'Obtiene la bitacora de cuentas promesas',
      'description': 'Obtiene la bitacora completa',
      'tags' : ['BitacoraCuentaLogica'],
      'responses': {
        '200': {
          'description' : 'Bitacora extraida con exito',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                'items': "$ref: '#/components/schemas/Bitacora Cuenta Compromisos'" 
              }
            }
          }
        }
      }
    },
    'post': {
      'summary': 'Crea un registo nuevo en la bitacora de cuentas promesas',
      'description': 'Crea registro en la bitacora cuenta promesas',
      'tags' : ['BitacoraCuentaLogica'],
      'requestBody' : {
        'required': true,
      },
      'responses': {
        '201': {
          'description':'Registro creado con exito'
        },
        '400': {
          'description':'Error en la solicitud'
        }
      }
    }
  }
}