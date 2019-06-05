const mongoose = require('mongoose');
const companySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    type: {type:String, required:true},
    number: String,
    about: String,
    location: String
});

module.exports = mongoose.model('Company',companySchema);