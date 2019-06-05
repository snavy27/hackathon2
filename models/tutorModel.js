const mongoose = require('mongoose');
const tutorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    type: {type:String, required:true},
    qualification: String,
    fields: String,
    number: String,
    email: String
});

module.exports = mongoose.model('Tutor',tutorSchema);