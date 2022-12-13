const {User} = require("../database");

module.exports = {
    create: (userInfo) => {
        return User.create(userInfo);
    },

    readAll: () => {
        return User.find({});
    },

    readOne: (params = {}) => {
        console.log(params);
        return User.findOne(params);
    },

    update: (userId, userInfo) => {
        return User.findByIdAndUpdate(userId, userInfo, {new: true});
    },

    delete: (userId) => {
        return User.deleteOne({_id: userId});
    }
}