import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from 'cors';

import router from "./Routes/index.js"


dotenv.config()

//port of project
const port = process.env.PORT || 3856;



const app = express()
app.use(cors());


// mongodb connect
mongoose
.connect(process.env.DB_URL)
    .then(() => {
        console.log("connecting with mongodb is work")
        app.listen(port, () => {
            console.log("serve is work in port " + port)
        })
    }).catch((error) => {
        console.log("error with connecting to mongodb" ,error)
    })



//routers 
app.use(express.json());


app.use('/api', router)