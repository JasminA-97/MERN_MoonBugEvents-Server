const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req,res) => {
    console.log('inside registerUserController fn ');
    const {username, email, password, phone} = req.body
    // console.log(username, email, password, phone);
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json('Account Already exist!! Pls Login')
        }else{
            const newUser = new users({username, email, password, phone})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
 }

 exports.loginUser = async(req,res)=>{
    console.log('inside loginUserController fn ');
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({user:existingUser,token})
        }else{
            res.status(404).json('Invalid Email or Password!')
        }
    }catch(err){
        res.status(401).json(err)
    }
 }

 //edit user profile
 exports.editProfile = async(req,res)=>{
    console.log('inside editProfile fn ');
    const {username,email,password,phone} = req.body
    const userId = req.payload
    try{
        const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,phone},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
 }

