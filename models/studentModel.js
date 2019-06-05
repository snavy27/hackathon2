const mongoose = require('mongoose');
//const updateSchema = require('./updateModel');
const updateSchema = mongoose.Schema({
    type: String,
    skills: String,
    experience: String,
    stipend: String,
    descp: String,
    company: String
});

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    type: {type:String, required:true},
    age:String,
    dob: String,
    college: String,
    branch: String,
    yearofgrad: String,
    number: String,
    skills:  String,
    // updates:[{
    //     type: String,
    //     skills: String,
    //     experience: String,
    //     stipend: String,
    //     descp: String
    // }]
    updates: [updateSchema]
});

module.exports = mongoose.model('Student',studentSchema);