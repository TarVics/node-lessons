const {OldPassword} = require("../database");

module.exports = {
    create: (params) => {
        return OldPassword.create(params);
    },

    readMany: (params, projection = undefined) => {
        return OldPassword.find(params, projection);
    },

    readOne: (params = {}) => {
        return OldPassword.findOne(params);
    },

    // update: (userId, userInfo) => {
    //     return User.findByIdAndUpdate(userId, userInfo, {new: true});
    // },
    //
    // delete: (userId) => {
    //     return User.deleteOne({_id: userId});
    // }
}