const joi = require('joi');
const mongoose = require('mongoose');

// joi schema
const schema = joi.object().keys({
	id: joi.string().required(),
    freezer: joi.array().items(joi.string()).required(),
    cooler: joi.array().items(joi.string()).required()
});

// mongoose schema
var userSchema = new mongoose.Schema({
	id: String,
    freezer: [String],
    cooler: [String],
});

let user = mongoose.model('fridge', userSchema);

// exports
module.exports = {
	JoiModel: schema,
	MongoModel: fridge
};