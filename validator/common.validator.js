const Joi = require('joi');

const {regex} = require('../enum');

module.exports = {
    idValidator: Joi.string().regex(regex.MONGO_ID)
}
