const mongoose = require('mongoose');

const CapituloSchema = new mongoose.Schema({
    id: {type: Number, unique: true, required: true},
    title: {type: String, required: true, lowercase: true},
    description: {type: String, required: true, lowercase: true},
    video: {type: String, required: true}    
});

module.exports = mongoose.model("Capitulo", CapituloSchema);

