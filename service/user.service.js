const {User} = require("../database");
const {userRepository} = require("../repository");
const {userPresenter} = require("../presenter");

module.exports = {
    create: (userInfo) => {
        return User.create(userInfo);
    },

    readAll: async (query) => {
        // return User.find({});
        const data = await userRepository.find(query);
        data.users = userPresenter.normalizeMany(data.users);

        return data;
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