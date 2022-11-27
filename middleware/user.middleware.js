const {ApiError} = require("../error");
const {userService} = require("../service");
const {userValidator, commonValidator} = require("../validator");

module.exports = {
    loadToReq: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userService.readOne({[dbField]: fieldToSearch});

            if(!user) {
                next(new ApiError('User not found', 404));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkCreate: async (req, res, next) => {
        try {
            const validate = userValidator.createValidator.validate(req.body);

            if (validate.error) {
                next(new ApiError(validate.error.message, 400));
                return;
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUpdate: async (req, res, next) => {
        try {
            const validate = userValidator.updateValidator.validate(req.body);

            if (validate.error) {
                next(new ApiError(validate.error.message, 400));
                return;
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                next(new ApiError('Email is empty', 400));
                return;
            }

            const user = await userService.readOne({email});

            if (user) {
                next(new ApiError('Email is already in use', 409));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserId: (req, res, next) => {
        try {
            const {userId} = req.params;

            const validate = commonValidator.idValidator.validate(userId);

            if(validate.error) {
                next(new ApiError(validate.error.message, 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}