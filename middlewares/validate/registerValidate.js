import Joi from "joi"

//validate register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}


export default validateRegisterUser