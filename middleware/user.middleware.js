const { ApiError } = require('../error');
const { User } = require('../database');

module.exports = {
    checkExists: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                next(new ApiError('User not found!', 404));
                return;
            }

            Object.assign(user, req.body);
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;
            if (!email) {
                next(new ApiError('Email is empty!', 400));
                return;
            }

            const user = await User.findOne({email});

            if (user) {
                next(new ApiError('User with this email already exists!', 400));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkBody: async (req, res, next) => {
        try {
            const user = req.body;

            if (!user) {
                next(new ApiError('User data is empty!', 400));
                return;
            }

            if (typeof user.age !== 'number' || user.age < 0 || user.age > 200) {
                next(new ApiError('User age is omitted or is not valid', 400));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}