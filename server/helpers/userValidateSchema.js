const Joi = require("joi");

//validate user inputs
const userValidateSchema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password")
});

module.exports = {
    userValidateSchema
};