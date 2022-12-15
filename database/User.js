const {Schema, model} = require('mongoose');
const oauthService = require("../service/oauth.service");

const userSchema = new Schema({
    name: {type: String, required: true, default: ''},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String },
    avatar: String,
    age: {type: Number, default: 18}
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('find', function () {
    this.fullname = `${this.name} Kanuik`;
});

userSchema.virtual('fullName').get(function () {
    return `${this.name} Kmin`;
});

userSchema.statics = { // for schema
    testStatic() {
        console.log('*** I am static');
    },
    async createWithHashPassword(userObject = {}) {
        // console.log(this);
        const hashPassword = await oauthService.hashPassword(userObject.password);
        return this.create({...userObject, password: hashPassword});
    }
}

userSchema.methods = { // for single record this = record
    testMethod() {
        console.log('*** I am method');
    },

    async comparePasswords(password) {
        // console.log(this);
        await oauthService.comparePasswords(this.password, password);
    }

}

module.exports = model('User', userSchema);