const Joi = require("joi").extend(require("@joi/date"));

const postValidateSchema = Joi.object({
    poster: Joi.required().label("poster"),
    category: Joi.string().valid("uncategorized", "autos", "electronic", "homeImprovement", "movie", "videoGame").required().label("category"),
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
    code: Joi.string().optional().allow("").label("coupon code"),
    expiryDate: Joi.date().format("YYYY-MM-DD").optional().allow("").label("expiry date"),
    likes: Joi.object().optional().allow("").label("likes")
});

module.exports = {
    postValidateSchema
};