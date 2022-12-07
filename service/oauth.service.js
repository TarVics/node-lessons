const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require("../error");
const {AWS_SECRET, AWS_REFRESH, FORGOT_PASS_TOKEN_PWD, CONFIRM_ACCOUNT_TOKEN_PWD} = require("../config");
const {OAuth} = require("../database");
const {tokenAction} = require("../enum");

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

    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = '';

        switch (actionType) {
            case tokenAction.FORGOT_PASS:
                secretWord = FORGOT_PASS_TOKEN_PWD;
                break;
            case tokenAction.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_TOKEN_PWD;
                break;
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'});
    },

    checkToken: (token = '', tokenType = tokenType.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenType.accessToken) secret = AWS_SECRET;
            else if (tokenType === tokenType.refreshToken) secret = AWS_REFRESH;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },

    checkActionToken: (token = '', actionType = tokenAction.FORGOT_PASS) => {
        try {
            let secretWord = '';

            switch (actionType) {
                case tokenAction.FORGOT_PASS:
                    secretWord = FORGOT_PASS_TOKEN_PWD;
                    break;
                case tokenAction.CONFIRM_ACCOUNT:
                    secretWord = CONFIRM_ACCOUNT_TOKEN_PWD;
                    break;
            }

            return jwt.verify(token, secretWord);
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