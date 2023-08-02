export const catCuentasBancos = {
  'CatCuentasBancos': {
    'type' : 'object',
    'properties': {
      'id': {
        'type': 'integer',
        'example': 400
      },
      'num_cuenta': {
        'type': 'string',
        'example': '3521365438547589'
      },
      'banco': {
        'type': 'string',
        'example': 'SANTANDER'
      },
      'fk_unidad_negocio': {
        'type': 'string',
        'example': '10'
      },
      'razon_social': {
        'type': 'string',
        'example': 'Secorp SA. CV'
      },
    }
  }
}