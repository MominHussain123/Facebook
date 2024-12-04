const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phoneNo: String,
    profileImage:String,
    bannerImage:String,
});


module.exports = new mongoose.model('User', userSchema);
