const mongoose = require("mongoose");

const postImageschema = new mongoose.Schema({
    postImage: String,
});


module.exports = mongoose.models.PostImage || mongoose.model('PostImage', postImageschema);

