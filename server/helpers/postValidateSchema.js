const Joi = require("joi")

const postValidateSchema = Joi.object({
    category: Joi.number().require().label("category"),
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
    code: Joi.string().label("coupon Code"),
    expireDate: Joi.date().label("date"),
    likes: Joi.object().label("likes")
});

module.exports = {
    postValidateSchema
};