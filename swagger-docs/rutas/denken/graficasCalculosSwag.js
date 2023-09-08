export const graficasCalculosRoutes = {
  '/denken/calculosgraficas/ingresos_cxc': {
    'get': {
      'summary': 'Obtiene ingresos por los CXC registrados en denken',
      'description': 'Obtiene CXC',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/denkenIngresosCxc' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/facturas_expedidas': {
    'get': {
      'summary': 'Obtiene las Facturas expedidas y timbradas de Denken',
      'description': 'Obtiene facturas timbradas',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/facturas_canceladas': {
    'get': {
      'summary': 'Obtiene las Facturas canceladas de Denken',
      'description': 'Obtiene facturas canceladas de denken como estadistica',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/balances': {
    'get': {
      'summary': 'Obtiene El balance de CXC y CXP de Denken',
      'description': 'Obtiene los ingresos y egresos de denken como estadistica',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/egresos': {
    'get': {
      'summary': 'Obtiene los egresos de Denken',
      'description': 'Obtiene los egresos de denken como estadistica',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/familias_gastos': {
    'get': {
      'summary': 'Obtiene los egresos agrupados por familias de Denken',
      'description': 'Obtiene los egresos de denken por familias como estadistica',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },
  '/denken/calculosgraficas/detallado_movimientos': {
    'get': {
      'summary': 'Obtiene los Listados De Movimientos De Bancos',
      'description': 'Obtiene todos los Listados De Movimientos De Bancos De Un Periodo',
      'tags' : ['Calculos De Graficas'],
      'parameters': [
        {
          name: 'unidad',
          in: 'query',
          description: 'Id de la unidad a filtrar',
          required: false,
          example: 'ruta?unidad=1'
        },
        {
          name: 'sucursal',
          in: 'query',
          description: 'Id de la sucursal a filtrar',
          required: false,
          example: 'ruta?sucursal=1'
        },
        {
          name: 'fechaI',
          in: 'query',
          description: 'Fecha inicial a filtrar',
          required: true,
          example: 'ruta?fechaI=2023-08-01'
        },
        {
          name: 'fechaF',
          in: 'query',
          description: 'Fecha Final a filtrar',
          required: true,
          example: 'ruta?fechaF=2023-08-01'
        },
        {
          name: 'limit',
          in: 'query',
          description: 'Filtro de Limite',
          required: false,
          example: 'ruta?limite=100'
        },
        {
          name: 'index',
          in: 'query',
          description: 'Index con el que se quedara la consulta',
          required: false,
          example: 'ruta?index=20'
        },
        
      ],
      'responses': {
        '200': {
          'description' : '',
          'content': {
            'application/json' : {
              'schema': {
                'type': 'json',
                '$ref': '#/components/schemas/' 
              }
            }
          }
        }
      }
    },
  },

}