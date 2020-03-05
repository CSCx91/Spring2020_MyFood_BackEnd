import { Mongoose } from "mongoose";
const joi = require('joi');

var profileSchema = new Mongoose.schema({
    
    familyID: String,
    allergies: [String],
    fitness: String,
    foodPref: [String]

});
var profile = Mongoose.model('profile', profileSchema);

const joiProfile = joi.object({
    allergies: joi.array().required(),
    foodPref: joi.array().required(),
    fitness: joi.int().required(),
    familyID: joi.string().required()
});


module.exports = profileSchema;
module.exports = profile;