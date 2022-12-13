const User = require('./User');

console.log('!!!!', User);

module.exports = {
    User,
    OAuth: require('./OAuth'),
    ActionToken: require('./ActionToken'),
    OldPassword: require('./OldPassword')
}