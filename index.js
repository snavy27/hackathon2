var express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const app = express();
const port = 3000;

const users = require('./routes/users');
const students = require('./routes/students');
const tutors = require('./routes/tutors');
const companies = require('./routes/companies');


mongoose.connect('mongodb://localhost:27017/hackapp',{useNewUrlParser: true});

//===O_o=============================================================================
//MIDDLEWARE
//===O_o=============================================================================

app.use(parser.json()); //should be written above below lines...parse json data
app.use(parser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use('*', function(req, res, next){ // to alllow cors error //mdn cors
    res.set('Access-Control-Allow-Origin','*') //editing header
    res.set('Access-Control-Allow-Headers','content-type'); //for chrome
    next();
});

app.use('/', users);
app.use('/', students);
app.use('/', tutors);
app.use('/', companies);



app.get('/', function(req, res){
    res.render("landing/landing");
})




app.listen(port, function(){
    console.log("SERVER INITIATED ON PORT 3000");
})