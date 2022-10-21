const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const usermodel= require("../Models/user")


router.get((req,res)=>{
    res.send("hello world")
})


router.post('/signup',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).res.json({error:"please add all fields"})
    }
    usermodel.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).res.json({error:"user already exits"})
        }
        const user = new usermodel({
            email,
            password
        })
        user.save()
        .then(user=>{
            res.json({message:"saved successfully"})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router;