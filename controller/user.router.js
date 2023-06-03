const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt");
const { userModel } = require("../model/user.model");
require("dotenv").config()

const userRouter = express.Router();

//user register endpoint
userRouter.post("/signup",async (req,res)=>{
    try {
        const { email,password} = req.body;

        if( !email || !password){
            return res.status(404).send({msg:"Please provide all fields"});
        }

        const hashPassword= await bcrypt.hash(password,+process.env.saltRound)

        await new userModel({email,password:hashPassword}).save()
        res.status(201).send({"msg":"new user has been registered successfully"});
    } catch (error) {
        res.status(400).send({ error: error.message })
        console.log(error)
    }
})

userRouter.post("/login",async (req,res)=>{
    const { email, password } = req.body
    try {
        if(!email || !password){
            return res.status(404).send({"msg":"please provide all fields"});
        }

        const user = await userModel.findOne({ email })
        if (user) {
          const passMatch = await bcrypt.compare(password, user.password);
          if (passMatch) {
            const token = await jwt.sign({ userId: user._id }, process.env.secretKey,{expiresIn:'7d'})
            res.status(200).send({ "msg": "Login successful", "token": token })
          } else {
            res.status(400).send({ "msg": "Wrong credential" })
          }
        }else {
          res.status(401).send({"msg":"User not found"})
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})





module.exports={userRouter}