const Joi = require("joi");

//validate user inputs
const userValidateSchema = Joi.object({
    displayName: Joi.string().optional().allow("").label("displayName"),
    email: Joi.string().email().required().label("email"),
    password: Joi.string().required().label("password")
});

module.exports = {
    userValidateSchema
};