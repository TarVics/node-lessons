const Joi = require('joi');

const {REGEX} = require("../config");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(REGEX.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(REGEX.PASSWORD).required()
    })
}