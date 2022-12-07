const {emailAction} = require('../enum');

module.exports = {
    [emailAction.FORGOT_PASS]: {
        subject: 'Your password is under protect',
        templateName: 'forgot-pass'
    },
    [emailAction.WELCOME]: {
        subject: 'Welcome aboard',
        templateName: 'welcome'
    }
}