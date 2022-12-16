require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',

    AWS_SECRET: process.env.AWS_SECRET || 'secretWord',
    AWS_REFRESH: process.env.AWS_REFRESH || 'secretRefreshWord',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_TOKEN_PWD: process.env.CONFIRM_ACCOUNT_TOKEN_PWD || 'CNF_ACN',
    FORGOT_PASS_TOKEN_PWD: process.env.FORGOT_PASS_TOKEN_PWD || 'FGP_TN',

    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,

    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_BUCKET_URL: process.env.S3_BUCKET_URL,
}