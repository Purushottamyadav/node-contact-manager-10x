const app = require("./app");
const mongoose = require("mongoose")
const PORT = process.env.PORT || 8000


mongoose.connect("mongodb+srv://contact:contact@cluster0.dzmsiy3.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("db connected")
})
 app.listen(PORT,()=>{console.log("server connected")})