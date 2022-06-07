const express = require('express');
const app= express();
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const User= require('./model/userSchema');
//connection to atlas
dotenv.config( {path: './config.env'});
require('./db/conn');
const PORT=process.env.PORT;
app.use(express.json()); 
app.use(require('./router/auth'));


//MIDDLEWARE

// const middleware= (req,res,next)=>{
//    console.log("middleware prevoked");
//    next();
// };
app.get("/",(req,res) =>{
   res.send("<h1>HELLO SUDHANKAR</h1>");
}
);

app.get("/test",(req,res)=>{
      res.cookie("test","data");
      res.send("testing cookues");
});
// app.get("/contacts",(req,res)=>{

// })
// app.get("/about",middleware, (req,res)=>{
//     res.send("This about page");
// })
// app.get("/signup",(req,res)=>{

// })
// app.get("signin",(req,res)=>{

// })
app.listen(PORT, ()=>{
        console.log('server is running at port '+PORT);
});