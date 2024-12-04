

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: String,
});


const comments = new mongoose.model('Comment', commentSchema);
module.exports = comments

