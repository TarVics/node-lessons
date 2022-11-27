require('dotenv').config();

const REGEX = require('./regex.enum');

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',
    AWS_SECRET: process.env.AWS_SECRET || 'secretWord',
    AWS_REFRESH: process.env.AWS_REFRESH || 'secretRefreshWord',
    REGEX
}