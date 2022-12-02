const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true, lowercase: true},
    description: {type: String, required: true, lowercase: true},
    image: {type: String, required: true},
    category: {type: String, required: true},
    chaptersIDS: [{ type: mongoose.Schema.Types.ObjectId, ref: "Capitulo"}]
})

module.exports = mongoose.model("Anime", AnimeSchema);