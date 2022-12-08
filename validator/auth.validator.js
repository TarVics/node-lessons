const Joi = require('joi');

const {regex} = require("../enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regex.PASSWORD).required()
    })
}