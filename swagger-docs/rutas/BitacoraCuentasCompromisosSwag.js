export const BitacoraCuentasCompromisos = {
  '/': {
    'get': {
      'summary': 'Obtiene la bitacora de cuentas compromisos',
      'description': 'Obtiene la bitacora completa',
      'tags' : ['Bitacora_Cuenta_Compromisos'],
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
      'summary': 'Crea un registo nuevo en la bitacora de cuentas compromisos',
      'description': 'Crea registro en la bitacora cuenta compromisos',
      'tags' : ['Bitacora_Cuenta_Compromisos'],
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