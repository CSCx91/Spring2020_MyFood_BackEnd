const joi = require("joi");
const mongoose = require('mongoose')

// joi schema
const schema = joi.object().keys({
    username: joi.string().required(),
    password: joi.string().required()
});

// mongoose schema
var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

let user = mongoose.model('user', userSchema)

// exports
module.exports = {
    JoiModel: schema,
    MongoModel: user
}
