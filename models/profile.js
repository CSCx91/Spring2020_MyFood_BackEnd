import { Mongoose } from "mongoose";
const Joi = require('joi')

var profileSchema = new Mongoose.schema({
    
    familyID: String,
    allergies: [String],
    fitness: String,
    foodPref: [String]

});
var profile = Mongoose.model('profile', profileSchema);

const joiProfile = Joi.object({
    allergies: Joi.array().required(),
    foodPref: Joi.array().required(),
    fitness: Joi.int().required(),
    familyID: Joi.string().required()
});


module.exports = profileSchema;
module.exports = profile;