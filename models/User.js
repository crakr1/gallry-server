import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String, 
        required: true,
        maxLength: 30,
        minLength: 3
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 6
    },
}, {
    timestamps: true
})

//token 
UserSchema.methods.AuthToken = function() {
    return jwt.sign({id: this._id, email: this.email }, process.env.JWT)
}

const User = mongoose.model("user", UserSchema)


export default User