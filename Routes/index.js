import express  from "express";

import { login, register } from "../controllers/AuthController.js";

import upload from "../middlewares/photoUpload.js"
import isLoggedIn from "../middlewares/authentication.js"


import {
    createPost,
    deletePost,
    getMyPost,
    getPost, 
    getPosts, 
    like, 
    updatePost
} from "../controllers/PostControllers.js"

const router = express.Router()

//auth controllers
router.post('/register', register)
router.post('/login', login)



//post controllers
router.get('/posts', getPosts)
router.get('/posts/:postId', getPost)
router.get('/my/posts/:userId', getMyPost)
router.put('/post/update/:userId/:postId', updatePost)
router.delete('/post/delete/:userId/:postId', deletePost)
router.post('/post/create/:userId', upload.single("image"), createPost)

// like post controllers
router.put('/post/like/:userId/:postId', like)


export default router