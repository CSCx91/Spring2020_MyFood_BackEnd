const Mongoose = require('mongoose');
const joi = require('joi');

const familySchema = Mongoose.Schema({
    profileId: [String],
    userId: String
});
var mongoFamily = Mongoose.model('family', familySchema);

const joiFamily = joi.object({
    profileId: joi.array().items(joi.string()),
    userId: joi.string().required()
});

module.exports.mongoFamily = mongoFamily;
module.exports.joiFamily = joiFamily;