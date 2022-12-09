const actionTokenService = require('./action-token.service');
const emailService = require('./email.pug.service');
const oauthService = require('./oauth.service');
const userService = require('./user.service');
const oldPasswordService = require('./old-password.service');

module.exports = {
    actionTokenService,
    emailService,
    oauthService,
    userService,
    oldPasswordService
}