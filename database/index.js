const database = require('./database');

module.exports = {
    userDatabase: database('user'),
    carDatabase: database('car')
}