const Mongoose = require('mongoose');;
const joi = require('joi');

var profileSchema = Mongoose.Schema({
    
    familyID: String,
    allergies: [String],
    fitness: String,
    foodPref: [String]

});
var mongoProfile = Mongoose.model('profile', profileSchema);

const joiProfile = joi.object({
    allergies: joi.array().required(),
    foodPref: joi.array().required(),
    fitness: joi.number().required(),
    familyID: joi.string().required()
});


module.exports = mongoProfile;
module.exports = joiProfile;