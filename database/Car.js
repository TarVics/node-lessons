const { model, Schema } = require('mongoose');

const carSchema = new Schema({
    name: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true}
});

module.exports = model('Car', carSchema);