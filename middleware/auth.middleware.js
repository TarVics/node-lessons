const {authValidator} = require("../validator");
const {ApiError} = require("../error");

module.exports = {
    checkLogin: (req, res, next) => {
        try {
            const validate = authValidator.loginValidator.validate(req.body);

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