const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const usermodel = require("../Models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { JWT_SECRET } = require("../keys")

router.get("/getUser", async (req, res) => {
    // res.send("hello world")
    try {
        const userdata = await usermodel.findOne({ _id: req.headers.id });
        res.json({
            userdata
        })
    } catch (err) {
        res.json({
            res: err
        })
    }
})





router.post('/signup', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (email && password) {
            const response = await usermodel.findOne({ email: email });
            if (response) {
                res.status(200).json({
                    msg: 'email already exist',
                })
            }
            else {
                bcrypt.hash(password, 10).then(async (hspass) => {
                    const result = await usermodel.create({ email: email, password: hspass })
                    res.status(200).json({
                        msg: 'Registered successfully',
                        data: result
                    })
                })
            }
        } else {
            res.status(400).json({
                msg: "please provide email & password"
            });
        }
    } catch (err) {
        res.status(400).json({
            msg: err
        })
    }
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) {
        return res.status(422).res.json({ error: "please add all fields" })
    }
    usermodel.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "please enter valid info" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(match => {
                    if (match) {
                        // 
                        const token = jwt.sign({ id: savedUser.id }, JWT_SECRET)
                        res.json({ message: "success", token })

                    } else {
                        return res.status(422).json({ error: "please enter valid info" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router;