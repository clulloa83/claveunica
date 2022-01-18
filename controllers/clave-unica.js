const { response } = require('express');
const { StatusCode } = require('status-code-enum');
const servicioClaveUnica = require('../services/servicio-clave-unica');
const { Params } = require('../models/params');

/**
 * obtiene url de acceso a clave unica
 * @param {*} req 
 * @param {*} res 
 */
const obtenerUrl = async(req, res = response) => {

    const { clientId, clientSecret, redirectUri } = req.query;

    const params = new Params();
    params.clientId = clientId;
    params.clientSecret = clientSecret;
    params.redirectUri = redirectUri;

    try {

        const cliente = await servicioClaveUnica.GetCreateIfNotExistCliente(params);
        const url = await servicioClaveUnica.obtenerUrl(cliente);

        res.status(StatusCode.SuccessOK).json({ url })

    } catch (error) {
        console.log('error obtenerUrl', error);
        res.status(StatusCode.ServerErrorInternal).json({ error })
    }

};

/**
 * obtiene token
 * @param {*} req 
 * @param {*} res 
 */
const obtenerToken = async(req, res) => {

    const { clientId, clientSecret, redirectUri, originalUrl } = req.query;

    const params = new Params();
    params.clientId = clientId;
    params.clientSecret = clientSecret;
    params.redirectUri = redirectUri;
    
    try {

        const cliente = await servicioClaveUnica.GetCreateIfNotExistCliente(params);
        const token = await servicioClaveUnica.obtenerToken(cliente, originalUrl);
        
        res.status(StatusCode.SuccessOK).json({ token })
        
    } catch (error) {
        console.log('error obtenerToken', error);
        res.status(StatusCode.ServerErrorInternal).json({ error })
    }

};

/**
 * obtiene info de usuario
 * @param {*} req 
 * @param {*} res 
 */
const obtenerUsuarioInfo = async(req, res) => {

    const { token } = req.query;

    try {

        const usuarioInfo = await servicioClaveUnica.obtenerInfoUsuario(token);
        res.status(StatusCode.SuccessOK).json({ usuarioInfo });
        
    } catch (error) {
        console.log('error obtenerUsuarioInfo', error);
        res.status(StatusCode.ServerErrorInternal).json({ error })
    }
};

/**
 * cierra sesion
 * @param {*} req 
 * @param {*} res 
 */
const cerrarSesion = async(req, res) => {

    const { urlLogout } = req.query;

    try {
        const url = await servicioClaveUnica.cerrarSesion(urlLogout);
        // console.log('url',url);

        res.status(StatusCode.SuccessOK).json({ url });

    } catch (error) {
        console.log('error cerrarSesion', error);
        res.status(StatusCode.ServerErrorInternal).json({ error })
    }

    
};

module.exports = {
    obtenerUrl,
    obtenerToken,
    obtenerUsuarioInfo,
    cerrarSesion,
}