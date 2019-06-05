const express = require('express');
const router = express.Router(); 
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const studentModel = require('../models/studentModel');
const companyModel = require('../models/companyModel');
const tutorModel = require('../models/tutorModel');
const jwt = require('jsonwebtoken');

//===O_o=============================================================================
//REGISTER
//===O_o=============================================================================

router.get('/register', function(req, res){ 
    res.render("register-and-login/register");
});

router.post('/register', function(req, res){
    console.log(req.body.type);
    if(req.body.type == "student"){
    const newStudent = new studentModel({ 
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password,10),
        type: req.body.type
    });
    studentModel.find({email:req.body.email}) 
    .exec() 
    .then(users=>{
        console.log(users)
        if(users.length>0){ 
            console.log("len")
            res.redirect(req.body.type+'/login').status(201);
        }
        else{
            newStudent.save();
            res.redirect(req.body.type+'/login').status(201);
        }
    })
    .catch(err=>{
        res.send(err);
    })
}
else if(req.body.type == "tutor"){
    const newTutor = new tutorModel({ 
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password,10),
        type: req.body.type 
    });

    tutorModel.find({email:req.body.email}) 
    .exec() 
    .then(users=>{
        if(users.length>0){
            res.redirect(req.body.type+'/login').status(201);
        }
        else{
            newTutor.save();
            res.redirect(req.body.type+'/login').status(201);
        }
    })
    .catch(err=>{
        res.send(err);
    })
}
else if(req.body.type == "company"){
    const newCompany = new companyModel({ 
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password,10),
        type: req.body.type 
    });
    companyModel.find({email:req.body.email}) 
    .exec() 
    .then(users=>{
        if(users.length>0){
            res.redirect(req.body.type+'/login').status(201);
        }
        else{
            newCompany.save();
            res.redirect(req.body.type+'/login').status(201);
        }
    })
    .catch(err=>{
        res.send(err);
    })
}
});

//===O_o=============================================================================
//LOGIN
//===O_o=============================================================================

router.get("/student/login", function(req, res){
    res.render("register-and-login/student-login")
})

router.get("/tutor/login", function(req, res){
    res.render("register-and-login/tutor-login")
})

router.get("/company/login", function(req, res){
    res.render("register-and-login/company-login")
})

router.post('/student/login', function(req, res){
    studentModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user===null){
            res.render("register-and-login/error-page");
        }
        else{
            if(bcryptjs.compareSync(req.body.password,user.password)){
                const token = jwt.sign( 
                    {
                        email: user.email, 
                        _id: user._id
                    },
                    'secret', 
                    {
                        expiresIn: '10s'
                    }
                );
                //res.send("logged in"+req.body.email)
                res.redirect("/student/"+req.body.email).status(200);
            }
            else
            res.render("register-and-login/error-page");

        }
    })
    .catch(err=>{
        res.render("register-and-login/error-page");
    })
});

router.post('/tutor/login', function(req, res){
    tutorModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user===null){
            res.render("register-and-login/error-page");
        }
        else{
            if(bcryptjs.compareSync(req.body.password,user.password)){
                const token = jwt.sign( 
                    {
                        email: user.email, 
                        _id: user._id
                    },
                    'secret', 
                    {
                        expiresIn: '3h'
                    }
                );
                //res.send("logged in"+req.body.email)
                res.redirect("/tutor/"+req.body.email).status(200);
            }
            else
            res.render("register-and-login/error-page");

        }
    })
    .catch(err=>{
        res.render("register-and-login/error-page");
    })
});

router.post('/company/login', function(req, res){
    companyModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(user===null){
            res.render("register-and-login/error-page");
        }
        else{
            if(bcryptjs.compareSync(req.body.password,user.password)){
                const token = jwt.sign( 
                    {
                        email: user.email, 
                        _id: user._id
                    },
                    'secret', 
                    {
                        expiresIn: '3h'
                    }
                );
                res.redirect("/company/"+req.body.email).status(200);
            }
            else
            res.render("register-and-login/error-page");

        }
    })
    .catch(err=>{
        res.render("register-and-login/error-page");
    })
});

module.exports = router;