const { request } = require('express');
const { StatusCode } = require('status-code-enum')
const servicioJWT = require('../services/servicio-JWT');
const dao2 = require('../db/connection-sql.js');

//TODO

/**
 * SP valida en bd sql el token de usuario
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const validarJWT = async(req = request, res = response, next) => {

    const conn2 = await dao2.conexionObtener();
    const token = req.headers.authorization;

    if( !token ){
        return res.status(StatusCode.ClientErrorForbidden).send( { mensaje: 'se requiere token en solicitud de petición' } );
    }
    else{

        servicioJWT.validaToken(conn2, token)
            .then((result) => {
                if(!result){
                    return res.status(StatusCode.ClientErrorForbidden).send( { mensaje: 'token no válido en solicitud de petición' } );
                }
                else{
                    next();
                };
            })
            .catch((error) => {
                console.log('validarJWT2 error', error);
                return res.status(StatusCode.ServerErrorInternal).send( { mensaje: `error al validar JWT. error: ${ error }` });
            });
    }
};

module.exports = {
    validarJWT
}