const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../error");
const {AWS_SECRET, AWS_REFRESH} = require("../config");
const {OAuth} = require("../database");

module.exports = {
    hashPassword: password => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isEqual = await bcrypt.compare(password, hashPassword);
        if (!isEqual) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, AWS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(dataToSign, AWS_REFRESH, {expiresIn: '30m'});

        return {
            accessToken,
            refreshToken
        }
    },

    create: (authInfo) => {
        return OAuth.create(authInfo);
    }
}