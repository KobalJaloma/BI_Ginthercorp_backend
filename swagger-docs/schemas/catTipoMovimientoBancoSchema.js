export const catTipoMovimientoSchema = {
  'CatTipoMovimientoBanco': {
    'type' : 'object',
    'properties': {
      'id': {
        'type': 'integer',
        'example': 400
      },
      'description': {
        'type': 'string',
        'example': 'Operaciones'
      },
      'clave': {
        'type': 'string',
        'example': 'OP1'
      },
    }
  }
}