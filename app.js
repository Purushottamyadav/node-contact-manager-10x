const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(express.json())

const contactroute = require("./routes/contact.js");
const userroute =require("./routes/user.js")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
app.use('/', contactroute);
app.use('/', userroute);


app.use(express.json());
module.exports = app








// const express = require('express');
// const app = express();


// // Import routes
// const blogRoute = require('./routes/blog');


// //Router MIddlewares
// app.use(express.json());
// app.use('/', blogRoute);

// module.exports = app;
