import { Mongoose } from "mongoose";
const joi = require('joi')

var familySchema = new Mongoose.schema({
    profileID: [String],
    userID: String
});
var family = Mongoose.model('family', familySchema);

const family = joi.object({
    profileId: joi.array().items(String),
    userID: Joi.string().required()
});

module.exports = familySchema;
module.exports = family;