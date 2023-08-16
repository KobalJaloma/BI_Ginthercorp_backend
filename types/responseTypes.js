export const successRes = (arg) => {
    return {
        status: 'OK',
        message: arg || 'Peticion Completada Con Exito'
    }
}
export const successUpdateRes = (payload, arg) => {
    return {
        status: 'OK',
        message: arg || 'Peticion Completada Con Exito',
        paylaod: payload
    }
}

export const errorRes = (error, arg) => {
    return {
        status: 'ERROR',
        message: arg || 'Peticion Erronea, hubo un fallo',
        error: error
    }
}

export const authErrorRes = () => {
    return {
        status: 'ERROR',
        message: 'Tu Clave Cifrada Es Incorrecta, Verificar Clave',
        error: 'AUTH'
    }
}

export const updateErrorRes = (payload, message) => {
    return {
        status: 'ERROR',
        message: message || 'Hubo un error al intentar actualizar tu registro',
        paylaod: payload
    }
}

export const failRes = (message = '', side = '') => {
    return {
        status: 'FAIL',
        message:  message || 'Peticion Erronea, No Se Encontro Informacion',
        side: side || 'DEFAULT'
    }
}
