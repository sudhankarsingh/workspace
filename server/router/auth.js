const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken'); 
const express= require('express');
const router =express.Router();
const User=require("../model/userSchema");
require("../db/conn");
router.get('/',(req,res)=>{
    res.send("This is router's home page");
});
const authenticate=require("../middleware/authenticate");



//USING AYSNCHRONOUS SYNCHRONOUS FUNCTIONS AND AWAIT
router.post('/register',async (req,res)=>{

   const {name , email, phone, work, password, cpassword }= req.body;
    
   if(!name || !email || !phone || !work || !password || !cpassword ){
         return res.status(422).json({error :" please fill all the enities"});
   }

   try {
         const  userExist= await User.findOne({email:email});
         if(userExist){
                 return res.status(422).json({error: "email already exist"});
         }else if(password != cpassword){
            return res.status(422).json({error: "password are not matching "});
         }

         const user=new User({name, email, phone, work,password, cpassword});
            //calling pre (refer to userSchema) to hash the password
         await user.save();
        //console.log(userRg);
      
               res.status(201).json({message:"Registration Successful"});
        
   } catch (error) {
         console.log(error);
   } 
    
});

// USING PROMISES
// router.post('/register',(req,res)=>{

//    const {name , email, phone, work, password, cpassword }= req.body;
    
//    if(!name || !email || !phone || !work || !password || !cpassword ){
//          return res.status(422).json({error :" please fill all the enities"});
//    }
//     User.findOne({email:email})
//     .then((userExist)=>{
//             if(userExist){
//                      return  res.status(422).json({error:"eamil already exist"});

//             }

//             const user=new User(req.body);
             

//             // user.save((err,newuser)=>{
//             //               if(err){
//             //                       res.status(500).json({error :  " registration failed "})
//             //               }else{
//             //                     res.status(200).json({message: "registration succesfull"})
//             //               }
//             // })

//             user.save().then(() => {
//                   res.status(201).json({message:"saved successfully"});
//             }).catch((err)=>
//                   res.status(500).json({error:"registration failed"})
//             );
//     }).catch(err=>{
//           console.log(err);
//     });



//       // console.log(req.body.name);
       
//       //     res.json( {message: req.body});
// });


//LOGIN ROUTE
router.post('/signin',async (req,res)=>{

      try {
            const {email, password}=req.body;
            if(!email && !password){
                  return res.status(422).json({error: "fill all the fields"});
            }
            if(!email) 
                return res.status(422).json({error:"Enter Email"});
    
            if(!password)
               return res.status(422).json({error:" please enter the password"});
            
               //GET THE PASSWORD FROM DATABASE(ATLAS)
            const isUser= await User.findOne({email:email});  
             if(!isUser) 
                return res.status(400).json({error: "Inavalid credential"});

             //Token generation function
             const token=await isUser.generateAuthToken();
             console.log(token);

             //Storing the cookies
                res.cookie("jwttoken",token,{
                      expires: new Date(Date.now()+25892000000),
                      httpOnly: true
                });
                //COMPARE THE PASSWORDS
            const isMatch= await bcrypt.compare(password, isUser.password);
            //console.log(isMatch);
               if(!isMatch){
                     res.status(400).json({error : "invalid credential"});
               }else{
                      res.status(200).json({message: "signin successfull" });
               }
            
      } catch (error) {
            console.log(error);
      }
      
});


router.get('/logout', (req,res)=>{
  console.log("hello logout");
  res.clearCookie('jwtoken',{path:'/'});
  res.status(200).send("user logged out");
});
module.exports= router;