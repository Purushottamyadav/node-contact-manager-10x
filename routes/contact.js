const express = require("express");
const auth=require("../middleware/authn")
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose = require("mongoose")
const contactModel = require("../Models/contacts")
const jwt= require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")

router.post("/addContact",auth, async (req, res) => {

    const { email, name, designation, company, industry, phone, country } = req.body
    
   
    try {
        // const verifyToken=jwt.verify(token,JWT_SECRET)

          console.log(req.body.user)

        const data = await contactModel.create({
            email,
            name,
            designation,
            company,
            industry,
            phone,
            country,
            useRef:req.user.id
           

        })
        data.save()

        res.json({
            message: "contact added succesfully",
            data
        })
    }

    catch (err) {
        res.send({
            message: err.message
        })
    }
})
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleteContact = await contactModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Deleted sucessfully",
            deleteContact
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
module.exports = router;