const Joi = require("joi")
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    username: Joi.string().min(4).max(20).required(),
    password: Joi.string().min(6).max(40).required(),
    confirmPassword:Joi.string().required().valid(Joi.ref('password')),
})

module.exports = {
    authSchema
}