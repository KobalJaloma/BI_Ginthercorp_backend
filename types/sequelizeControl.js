export const atributosControl = (atributos = []) => {
    var queryParam = atributos && { attributes: atributos };

    return queryParam;
}
