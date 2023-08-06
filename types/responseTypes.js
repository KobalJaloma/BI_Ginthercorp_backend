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
        message: 'Hubo un error con tu clave cifrada',
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