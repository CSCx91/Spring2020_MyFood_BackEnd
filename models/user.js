const joi = require("joi");
const mongoose = require('mongoose')

// joi schema
const schema = joi.object().keys({
    username: joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
    /*
        Regex means password must have 1 lowercase, 1 uppercase, 
        1 number, 1 special, and be at least 8 char
    */
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
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
