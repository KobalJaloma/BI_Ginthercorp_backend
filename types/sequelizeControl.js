
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