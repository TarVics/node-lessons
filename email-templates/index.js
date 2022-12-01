const {EMAIL_ACTIONS} = require('../config');

module.exports = {
    [EMAIL_ACTIONS.FORGOT_PASS]: {
        subject: 'Your password is under protect',
        templateName: 'forgot-pass'
    },
    [EMAIL_ACTIONS.WELCOME]: {
        subject: 'Welcome aboard',
        templateName: 'welcome'
    }
}