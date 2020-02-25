const joi = require('joi')
const family = joi.object({
    profileId: joi.array().items(String),
    userID: Joi.string().required()
});