const Mongoose = require('mongoose');
const joi = require('joi');

const familySchema = new Mongoose.Schema({
    profileID: [String],
    userID: String
});
var mongoFamily = Mongoose.model('family', familySchema);

const joiFamily = joi.object({
    profileId: joi.array().items(joi.string()),
    userID: joi.string().required()
});

module.exports.mongoFamily = mongoFamily;
module.exports.joiFamily = joiFamily;