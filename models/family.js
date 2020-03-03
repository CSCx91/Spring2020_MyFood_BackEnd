const Mongoose = require('mongoose');
const joi = require('joi')

const familySchema = new Mongoose.Schema({
    profileID: [],
    userID: String
});
var mongoFamily = Mongoose.model('family', familySchema);

const joiFamily = joi.object({
    profileId: joi.array().items(String),
    userID: Joi.string().required()
});

module.exports.mongoFamily = mongoFamily;
module.exports.mongoFamily = joiFamily;