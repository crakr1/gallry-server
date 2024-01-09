import User from "../models/User.js";
import bcrypt from "bcrypt"

import validateRegisterUser from "../middlewares/validate/registerValidate.js"
import validateLoginUser from "../middlewares/validate/loginValidate.js"


//  register new user
export const register = async(req, res) => {
    //validate register user 
    const {error} = validateRegisterUser(req.body)
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }
    //is user exist?
    const user = await User.findOne({email: req.body.email})
    if (user) {
        return res.status(400).json({message: "email is already used"})
    }
    //hashing password
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(req.body.password, salt)

    const {name, email,  password } = req.body;

    const newUser = new User({
        name, 
        email,
        password:hashed,
    })

    try{
       await newUser.save() 
       const user = await User.findOne({email: req.body.email})

       const token = user.AuthToken()
       res.status(200).json(token)
    }catch(err) {
        res.status(500).json({message: err.message})
    }
} 


// login user 
export const login = async(req, res) => {

    //validate login user 
    const {error} = validateLoginUser(req.body)
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }

    //is user?
    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).json({message: "password or email is invalid"})
    }

    //check password 
    const passwordCompare = await bcrypt.compare(req.body.password, user.password)
    if(!passwordCompare) {
        return res.status(400).json({message: "password or email is invalid"})
    }

    const token = user.AuthToken()

    res.status(200).json({
        token
    })
}