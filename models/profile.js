const Joi = require('joi')
const profile = Joi.object({
    allergies: Joi.array().required(),
    foodPref: Joi.array().required(),
    fitness: Joi.int().required()
});
