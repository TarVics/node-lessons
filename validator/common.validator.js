const Joi = require('joi');

const {REGEX} = require('../config');

module.exports = {
    idValidator: Joi.string().regex(REGEX.MONGO_ID)
}
