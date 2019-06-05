const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const studentModel = require('../models/studentModel');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, res, cb){
      cb(null, 'uploads/')
  }, // this saves your file into a directory called "uploads"
  filename: function(req, file, cb){
      cb(null, Date.now()+file.originalname)
  }
}); 

var upload = multer({storage: storage});

router.get("/student/:id", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        user.updates.forEach((data=>{
            console.log(data);
        }))
        res.render("student/student-dashboard",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/courses-available", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/student-courses-available",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/resources", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/student-resources",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/resources/view", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/student-resources-view",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})
////

router.get("/student/:id/courses-available/register", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/course-register",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/resources/webdev/add", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        console.log(user.email)
        res.render("student/student-webdev-add",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.post("/student/:id/resources/webdev/add",upload.single('file-to-upload'), function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.redirect("/student/"+req.params.id+"/resources");
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/discuss", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/discuss",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/contact", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/contactus-student",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/contact", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/contactus-student",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/resources/view/1", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/resource-1",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})


router.get("/student/:id/profile/", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/student-profile",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.get("/student/:id/profile/update", function(req, res){
    var email = req.params.id;
    studentModel.findOne({email:email})
    .exec()
    .then(user=>{
        res.render("student/student-update",{user:user});
    })
    .catch(err=>{
        res.send(err);
    })
})

router.put("/student/:id/profile/update", function(req, res){
    console.log(req.body.student)
    var email = req.params.id;
    studentModel.findOneAndUpdate({email:email}, req.body.student)
    .exec()
    .then(user=>{
        res.redirect("/student/"+req.params.id+"/profile/");
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports = router;