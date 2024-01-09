import {Post, createPostValidate} from "../models/Post.js"
import User from "../models/User.js"
import mongoose from "mongoose"
import path from "path"


//create post 
export const createPost = async(req, res) => {
    const pathImage = path.join(process.cwd(), `../images${req.file.filename}`)
    const userId = req.params.userId
    const {title, description } = req.body

    const newPost = new Post({
        title: title,
        description: description,
        image: pathImage,
        userId: userId 
    })

    try {
        await newPost.save()
        res.status(200).json(newPost)
    }catch(e) {
        res.status(500).json({message: err.message})
    }
}


//get posts 
export const getPosts = async (req,res) => {
    const posts = await Post.find()
    try {
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json(e)
    }
}

//get post 
export const getPost = async (req, res) => {
    const postId = req.params.postId
    try{
        const post = await Post.findById(postId)
        res.status(200).json(post)

    } catch (e) {
        res.status(500).json(e)
    }
}

// get my post 
export const getMyPost = async(req, res) => {
    const userId = req.params.userId
    try{ 
        const post = await Post.find({userId: userId})
        res.status(200).json(post)
    } catch(e) {
        res.status(500).json(e)
    }
}

//update post 
export const updatePost= async (req, res) => {
    const postId = req.params.postId
    const userId = req.params.userId

    try{
        const post = await Post.findById(postId)
        if(post.userId === userId) {
            await post.updateOne({ $set: req.body})
            res.status(200).json({message: "post updated"})
        }
    }catch(e) {
        res.status(500).json(e)
    }

}


//delete post 
export const deletePost = async (req, res) => {
    const postId = req.params.postId
    const post = await Post.findById(postId)

    await Post.findByIdAndDelete(post)
    try{
        console.log(post)
        res.status(200).json({message: "post deleted"})
    } catch (e) {
        res.status(500).json(e)
    }
} 


//like post
export const like = async (req, res) => {
    const userId = req.params.userId
    const postId = req.params.postId

    let post = await Post.findById(postId)
    const isPostLiked = post.likes.find((user) => user.toString() === userId)
    if(isPostLiked){
        post = await Post.findByIdAndUpdate(postId, {
            $pull: {likes: userId}
        }, {new  : true})
    } else {
        post = await Post.findByIdAndUpdate(postId, {
            $push: {likes: userId}
        }, {new : true})
    }
    console.log(post)
    res.status(200).json(post)
   

}