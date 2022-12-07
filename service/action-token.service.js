const {ActionToken} = require("../database");

module.exports = {
    create: (params) => {
        return ActionToken.create(params);
    },

    readAll: () => {
        return ActionToken.find({});
    },

    readOne: (params = {}) => {
        return ActionToken.findOne(params);
    },

    update: (id, params) => {
        return ActionToken.findByIdAndUpdate(id, params, {new: true});
    },

    delete: (token) => {
        return ActionToken.deleteOne({token});
    }
}