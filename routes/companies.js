const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const companyModel = require('../models/companyModel');
const studentModel = require('../models/studentModel');

router.get("/company/:id", function(req, res){
    var email = req.params.id;
    companyModel.findOne({email:email})
    .exec()
    .then(user=>{
        //console.log(user)
        res.render("company/company-dashboard",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/company/:id/contact", function(req, res){
    var email = req.params.id;
    companyModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("company/contactus-company",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.post("/company/:id", function(req, res){
    var email = req.params.id;
    console.log(req.body.com.skills)
    companyModel.findOne({email:email})
    .exec()
    .then(user=>{
        studentModel.createIndexes({skills: "text"})
        studentModel.find({$text: {$search: req.body.com.skills}}, function(err, users){
            if(users){
            users.forEach((data)=>{
                data.updates.push(req.body.com)
                data.save();
                console.log(data);
            })
        }
            res.redirect("/company/"+req.params.id);
        })
        //.exec()
        // .then(users=>{
        //     console.log(users)
        //     users.forEach(function(data){
        //         data.updates.push(req.body.com)
        //         console.log("//////./////.////")
        //     })
        //     res.redirect("/company/"+req.params.id);

        // })
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/company/:id/profile/", function(req, res){
    var email = req.params.id;
    companyModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("company/company-profile",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })    
})

router.get("/company/:id/profile/update", function(req, res){
    var email = req.params.id;
    companyModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("company/company-update",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })    
})

router.put("/company/:id/profile/update", function(req, res){
    console.log(req.body.company)
    var email = req.params.id;
    companyModel.findOneAndUpdate({email:email}, req.body.company)
    .exec()
    .then(user=>{
        res.redirect("/company/"+req.params.id+"/profile/update");
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports = router;