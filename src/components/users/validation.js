const Joi = require('joi');

const validSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30),

    lastName: Joi.string()
        .min(3)
        .max(30),

    phoneNumber: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999),
});

function joiValidation(obj) {
    return validSchema.validate(obj);
}

module.exports = joiValidation;