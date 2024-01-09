import Joi from "joi"

//validate login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    })
    return schema.validate(obj)
}

export default validateLoginUser