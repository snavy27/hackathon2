const mongoose = require('mongoose');
const updateSchema = mongoose.Schema({
    type: String,
    skills: String,
    experience: String,
    stipend: String,
    descp: String
});

module.exports = mongoose.model('Update',updateSchema);