const actionTokenService = require('./action-token.service');
const emailService = require('./email.service');
const oauthService = require('./oauth.service');
const userService = require('./user.service');
const oldPasswordService = require('./old-password.service');
const S3Service = require('./s3.service');

module.exports = {
    actionTokenService,
    emailService,
    oauthService,
    userService,
    oldPasswordService,
    S3Service
}