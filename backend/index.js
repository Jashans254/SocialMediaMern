import express from "express";
import dotenv from 'dotenv';
import { connectDb } from "./database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import {app , server } from "./socket/socket.js";
import path from 'path'

dotenv.config();

cloudinary.v2.config({
    cloud_name : process.env.Cloudinary_Cloud_Name ,
    api_key : process.env.Cloudinary_Api ,
    api_secret : process.env.Cloudinary_Secret,
})

// const app = express();


// using middleware
app.use(express.json()); // read json data
app.use(cookieParser());

// app.get("/" , (req , res)=>{
//     res.send("Hello World");
// })
const port = process.env.PORT ;


// importing routes 
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

// using routes
app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/messages' , messageRoutes)


const __dirname = path.resolve();

app.use(express.static(path.join(__dirname , "/frontend/dist")))

app.get("*" , (req , res)=>{
    res.sendFile(path.join(__dirname, "frontend" , "dist" , "index.html"))
})

// app.listen(port  , ()=>{
//     console.log(`Server is running on http://localhost:${port}`);

//     connectDb();
// })
server.listen(port  , ()=>{
    console.log(`Server is running on http://localhost:${port}`);

    connectDb();
})


