const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const tutorModel = require('../models/tutorModel');

router.get("/tutor/:id", function(req, res){
    var email = req.params.id;
    tutorModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("tutor/tutor-dashboard-courses",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/tutor/:id/discuss", function(req, res){
    var email = req.params.id;
    tutorModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/discuss",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/tutor/:id/contact", function(req, res){
    var email = req.params.id;
    tutorModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("tutor/contactus-tutor",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/tutor/:id/profile/", function(req, res){
    var email = req.params.id;
    tutorModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("tutor/tutor-update",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })    
})


router.get("/tutor/:id/profile/update", function(req, res){
    var email = req.params.id;
    tutorModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("tutor/tutor-update",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })    
})

router.put("/tutor/:id/profile/update", function(req, res){
    console.log(req.body.tutor)
    var email = req.params.id;
    tutorModel.findOneAndUpdate({email:email}, req.body.tutor)
    .exec()
    .then(user=>{
        res.redirect("/tutor/"+req.params.id+"/profile/update");
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports = router;