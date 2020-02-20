const joi = require("joi");

const schema = joi.object().keys({
    username: joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
    /*
        Regex means password must have 1 lowercase, 1 uppercase, 
        1 number, 1 special, and be at least 8 char
    */
    password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/).required()
});

let test = {
    username: "test@googLe.com",
    password: "t0tAlly secure@"
};


let result = joi.validate(test, schema);

console.log(result.error);