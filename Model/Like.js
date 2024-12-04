const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    Like: String,
});


module.exports = mongoose.models.Like || mongoose.model('Like', likeSchema);



