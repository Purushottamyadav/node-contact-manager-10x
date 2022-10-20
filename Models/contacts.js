const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    email: {type:String, required:true},
    name: {type:String, required:true},
    designation: {type:String, required:true},
    company: {type:String, required:true},
    industry: {type:String, required:true},
    phone: {type:Number, required:true},
    country: {type:String, required:true},
});

module.exports = mongoose.model("contacts", contactSchema);