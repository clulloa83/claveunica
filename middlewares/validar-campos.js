const { validationResult } = require('express-validator');
const { response, request } = require('express');
const { StatusCode } = require('status-code-enum');

const validarCampos = (req = request, res = response, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(StatusCode.ClientErrorBadRequest ).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}