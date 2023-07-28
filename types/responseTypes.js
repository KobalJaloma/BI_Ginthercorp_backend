export const successRes = (arg) => {
    return {
        status: 'OK',
        message: arg || 'Peticion Completada Con Exito'
    }
}

export const errorRes = (error, arg) => {
    return {
        status: 'ERROR',
        message: arg || 'Peticion Erronea, hubo un fallo',
        error: error
    }
}