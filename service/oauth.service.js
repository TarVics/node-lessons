const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../error");
const {AWS_SECRET, AWS_REFRESH} = require("../config");
const {OAuth} = require("../database");
const {tokenTypeEnum} = require("../enum");

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

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = AWS_SECRET;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = AWS_REFRESH;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },

    create: (authInfo) => {
        return OAuth.create(authInfo);
    },

    readOne: (params = {}) => {
        return OAuth.findOne(params);
    },

    delete: (params = {}) => {
        return OAuth.deleteOne(params);
    }
}