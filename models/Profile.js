const Mongoose = require('mongoose');
const joi = require('joi');

var profileSchema = Mongoose.Schema({
    
    familyId: String,
    allergies: [String],
    fitness: Number,
    foodPref: [String]

});
var mongoProfile = Mongoose.model('profile', profileSchema);

const joiProfile = joi.object({
    allergies: joi.array().items(joi.string()),
    foodPref: joi.array().items(joi.string()),
    fitness: joi.number().required(),
    familyId: joi.string().required()
});


module.exports.mongoProfile = mongoProfile;
module.exports.joiProfile = joiProfile