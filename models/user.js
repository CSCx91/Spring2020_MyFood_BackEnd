const joi = require('joi');
const mongoose = require('mongoose');

// joi schema
const schema = joi.object().keys({
	username: joi.string(),
	password: joi.string()
});

// mongoose schema
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	access_token: [
		{
			value: String,
			expireDate: Number
		}
	]
});

let user = mongoose.model('user', userSchema);

// exports
module.exports = {
	JoiModel: schema,
	MongoModel: user
};
