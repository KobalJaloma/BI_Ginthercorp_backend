import { Op } from "sequelize";

export const atributosControl = (attr = '') => {
    var queryParam;
    var atributosArr;
    
    if(attr) {
        atributosArr = attr.split(',');
        queryParam = { attributes: atributosArr };
        
        return queryParam;
    }

    return; //no retornara nada para que las funciones sirvan por layout
}

export const periodosControl = (fechaI, fechaF, keyFecha, whereClaus = true) => {
    var queryParam = {};
    
    if(fechaI && fechaF) {
        queryParam = {
            //CONDICION AND!
            [Op.and]: [
                {
                    //TOMA EL VALOR DE KEYFECHA COMO EL NOMBRE DE LA KEY EN MODEL {KEY:VALUE}
                    [keyFecha] : {
                        //CONDICIONAL >= QUE
                        [Op.gte]: fechaI
                    }
                },
                {
                    [keyFecha] : {
                        //CONDICIONAL <= QUE
                        [Op.lte]: fechaF
                    }
                },
            ],
        }
        //LA VARIABLE whereClaus ES PARA EVALUAR SI DEVOLVEMOS EL JSON CON SENTENCIA WHERE O NO
        return whereClaus ? { where : queryParam} : queryParam;
    }
    if(fechaI) {
        queryParam = {
            [keyFecha]: {
                [Op.gte] : fechaI
            }
        }
        return whereClaus ? { where: queryParam } : queryParam;
    }

    if(fechaF) {
        queryParam = {
            [keyFecha]: {
                [Op.lte] : fechaF
            }
        }
        
        return whereClaus ? { where: queryParam } : queryParam
    }
}
