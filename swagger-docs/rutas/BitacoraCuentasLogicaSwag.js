export const BitacoraCuentasLogica = {
  '/': {
    'get': {
      'summary': 'Obtiene la bitacora de cuentas Logica',
      'description': 'Obtiene la bitacora completa',
      'tags' : ['Bitacora_Cuenta_Logica'],
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
      'summary': 'Crea un registo nuevo en la bitacora de cuentas logica',
      'description': 'Crea registro en la bitacora cuenta logica',
      'tags' : ['Bitacora_Cuenta_Logica'],
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
  },
}