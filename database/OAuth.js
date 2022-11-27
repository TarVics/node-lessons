const {Schema, model} = require('mongoose');

const oauthSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    accessToken: {type: String},
    refreshToken: {type: String}
}, {
    timestamps: true
});

module.exports = model('OAuth', oauthSchema);