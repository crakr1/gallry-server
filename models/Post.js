import mongoose from "mongoose"
import Joi from "joi"

const PostSchema = new mongoose.Schema ({
    userId: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    image: {
        type: Object,
        default: {
            url: ""
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ]
},{
    timestamps: true
})

export const Post = mongoose.model("post", PostSchema)


//create post validate 
export function createPostValidate(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).required(),
        description: Joi.string().trim().min(2).required(),
        image: required()
    })
    return schema.validate(obj)
}


//update post validate 
export function updatePostValidate(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).required(),
        description: Joi.string().trim().min(2).required()
        })
    return schema.validate(obj)
}

