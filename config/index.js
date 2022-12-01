require('dotenv').config();

const REGEX = require('./regex.enum');
const EMAIL_ACTIONS = require('./email-action.enum');

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',
    AWS_SECRET: process.env.AWS_SECRET || 'secretWord',
    AWS_REFRESH: process.env.AWS_REFRESH || 'secretRefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    REGEX,
    EMAIL_ACTIONS
}