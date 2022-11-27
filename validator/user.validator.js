const Joi = require('joi');

const {REGEX} = require('../config');

module.exports = {
    createValidator: Joi.object({
        name: Joi.string().min(2).max(100).required().default(''),
        email: Joi.string().regex(REGEX.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(REGEX.PASSWORD).required(),
        age: Joi.number().integer().min(1).max(120)
    }),

    updateValidator: Joi.object({
        name: Joi.string().min(2).max(100).optional().default(''),
        email: Joi.string().regex(REGEX.EMAIL).lowercase().trim().optional(),
        age: Joi.number().integer().min(1).max(120).optional()
    })
}
