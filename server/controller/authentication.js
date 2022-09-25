const User=require('../Model/Userschema');
const GoogleUser=require('../Model/Googleuser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {ObjectId}=require('mongoose').ObjectId;
const mongoose=require('mongoose');

const usercreation=async (req,res)=>{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res
            .status(400)
            .json({
                success:false,
                message:"please provide all credential"
            })
        }
        const userexists=await User.findOne({email})
        .clone()
        .catch(function (err) {
          console.log(err);
        });
        if(userexists){
            return res.status(400).json({
                sucess: "false",
                message: "User with this credential already exists please log in..",
              });
        }
        try{
            const newuser=await User.create({name,email,password});
            newuser.password=undefined;
            jwt1={userID:newuser._id,userl:"website"}
            const token=jwt.sign(jwt1,process.env.JWT_SECRET,{ 
                expiresIn: process.env.JWT_LIFETIME,
              });
            res.status(200).json({user:newuser,token});
        }
        catch(err){
            console.log("error: ",err);
            res.status(500).json(err.message);
        }
}
const userlogin=async (req,res,next)=>{
    try{
    const {email,password}=req.body;
    if( !email || !password){
        return res
        .status(400)
        .json({
            success:false,
            message:"please provide all credential"
        })
    }
    const existuser=await User.findOne({email})
    .select("+password")
    .clone()
    .catch(function(err){
        console.log(err);
    })
    if(!existuser){
        
        return res.status(400).json({
            sucess: "false",
            message: "please enter valid credential",
          });
    }
    const passwordcheck=await bcrypt.compare(
        password,
        existuser.password
    );
    if(!passwordcheck){
        return res.status(400).json({
            sucess: "false",
            message: "please enter valid credential",
          });
    }
    existuser.password=undefined;
    jwt1={userID:existuser._id,userl:"website"}
    const token=jwt.sign(jwt1,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
    res.json({user:existuser,token});
}
catch(err){
 
    console.log("error: ",err);
    res.status(500).json(err.message);
}

}
const getUser=async (req,res)=>{
  const id=req.user.userId;
  id.toString();
  console.log(id);
    console.log(req.user);
    if(req.user.userl=="website"){
    const existuser=await User.findById(id)
    .clone()
    .catch(function (err) {
      console.log(err);
    });
    if(!existuser){
        return res.status(400).json("user doesnotexist relogin");
       
    }
  
    console.log("existuser");
    console.log(existuser);
    return res.status(200)
    .json({user:existuser});
}
else{
    const existuser1=await GoogleUser.findById(id)
    .clone()
    .catch(function (err) {
      console.log(err);
    });
    if(!existuser1){
        return res.status(400).json("user doesnotexist relogin");
       
    }
    console.log(existuser1);
    return res.status(200)
    .json({user:existuser1});
}
}
const googleusercreation=async (req,res)=>{
    const {name,email,profile}=req.body.user_profile;
    if(!name || !email ){
        return res
        .status(400)
        .json({
            success:false,
            message:"please provide all credential"
        })
    }
    const userexists=await GoogleUser.findOne({email})
    .clone()
    .catch(function (err) {
        console.log("here");
      console.log(err);
    });
    if(!userexists){
        try{
            const newuser=await GoogleUser.create({name,email,profilePicture:profile});
            const token=jwt.sign({userID:newuser._id,userl:"google"},process.env.JWT_SECRET,{ 
                expiresIn: process.env.JWT_LIFETIME,
              });
            res.status(200).json({user:newuser,token});
        }
        catch(err){
            console.log("error: ",err);
            res.status(500).json(err.message);
        }
    }
    else{
        const token=jwt.sign({userID:userexists._id,userl:"google"},process.env.JWT_SECRET,{ 
            expiresIn: process.env.JWT_LIFETIME,
          });
        res.status(200).json({user:userexists,token});
    }
   
}
module.exports={usercreation,userlogin,getUser,googleusercreation}