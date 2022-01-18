const ClientOAuth2 = require('client-oauth2');
const clientes = {};
const axios = require('axios');

/**
 * obtiene cliente segun su clientId en arreglo de clientes que persisten
 * @param {*} params 
 * @returns 
 */
const GetCliente = (params) => {
    if (clientes[params.clientId]){
        return clientes[params.clientId];
    }
    else{
        return null;
    }
}

/**
 * crea el cliente usando clientId como identificador en arreglo de clientes que persisten
 * @param {*} params 
 * @returns 
 */
const CreateCliente = (params) => {
    if (!GetCliente(params.clientId)){
        clientes[params.clientId] = new ClientOAuth2(params);
        return clientes[params.clientId];
    }
}
/**
 * retorna el cliente si existe, si no, lo crea y retorna
 * @param {*} params 
 * @returns 
 */
const GetCreateIfNotExistCliente = (params) => {
    let cliente = GetCliente(params.clientId);
    if(cliente){
        return cliente;
    }
    else{
        return CreateCliente(params);
    }
}

/**
 * obtiene url de cliente
 * @param {*} cliente 
 * @returns 
 */
const obtenerUrl = async(cliente) => {
    
    try {

        return cliente.code.getUri()

    } catch (error) {
        console.log('obtenerUrl error', error);
        throw new Error(error)
    }
}

/**
 * obtiene token de cliente
 * @param {*} cliente 
 * @param {*} url 
 * @returns 
 */
const obtenerToken = async(cliente, url) => {

    try {

        let user = await cliente.code.getToken(url);
        return user.accessToken;

    } catch (error) {
        console.log('obtenerToken error', error);
        throw new Error(error)
    }

}

/**
 * otiene info de usuario
 * @param {*} token 
 * @returns 
 */
const obtenerInfoUsuario = async(token) => {

    const bearer = 'Bearer ' + token;
    const config = {
        method: 'post',
        url: process.env.CLAVEUNICA_USERINFO_ENDPOINT,
        headers: { 'Authorization': bearer }
    };

    try {

        let response = await axios(config);
        return response.data;
        
    } catch (error) {
        console.log('obtenerInfoUsuario error', error);
        throw new Error(error)
    }

}

/**
 * cierra sesion clave unica
 * @param {*} urlLogout 
 * @returns 
 */
const cerrarSesion = async(urlLogout) => {
    
    let url = '';
    urlLogout ? url = `${ process.env.CLAVEUNICA_LOGOUT }?redirect=${ urlLogout }`
        : url = `${ process.env.CLAVEUNICA_LOGOUT }`;

    const config = {
        method: 'get',
        url: url,
    }; 

    try {

        let response = await axios(config);
        // console.log(JSON.stringify(response.data));
        return response.data;
        // return urlLogout;
        
    } catch (error) {
        console.log('cerrarSesion error', error);
        throw new Error(error)
    }

};

module.exports = {
    GetCreateIfNotExistCliente,
    GetCliente,
    obtenerUrl,
    obtenerToken,
    obtenerInfoUsuario,
    cerrarSesion
}