export const usuariosSchema = {
  'Usuarios': {
    'type' : 'object',
    'properties': {
      'id': {
        'type': 'integer',
        'example': 400
      },
      'nombre': {
        'type': 'string',
        'example': 'Alejandro'
      },
      'apellido': {
        'type': 'string',
        'example': 'Mustain'
      },
      'usuario': {
        'type': 'string',
        'example': 'alejandro.mustin'
      },
      'password': {
        'type': 'string',
        'example': 'LsQwED09VDE9'
      },
    }
  }
}