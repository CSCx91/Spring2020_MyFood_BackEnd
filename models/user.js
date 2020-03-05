const joi = require("joi");
const mongoose = require('mongoose')

// joi schema
const schema = joi.object().keys({
    username: joi.string().required(),
    /*
        Regex means password must have 1 lowercase, 1 uppercase, 
        1 number, 1 special, and be at least 8 char
    */
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
