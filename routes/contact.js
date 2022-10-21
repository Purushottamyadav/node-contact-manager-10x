const express = require("express");
const bodyparser = require("body-parser")
const router = express.Router();
const mongoose = require("mongoose")
const contactModel = require("../Models/contacts")
const jwt= require("jsonwebtoken")
const {JWT_SECRET} = require("../keys")

router.post("/addContact", async (req, res) => {

    const { email, name, designation, company, industry, phone, country, useRef,token } = req.body
   
    try {
        const verifyToken=jwt.verify(token,JWT_SECRET)
        
        const data = await contactModel.create({
            email,
            name,
            designation,
            company,
            industry,
            phone,
            country,
            useRef
           

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