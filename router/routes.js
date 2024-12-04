const routs = require("express").Router();

const routadate = require("../Controller/userController.js");
const uploads = require("../config/multer.js");
const auth = require("../Middleware/auth.js")

routs.post("/signup", uploads.fields([{ name: "profileImage", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }]), routadate.signup);



routs.post("/login", routadate.login);
routs.get("/getdata", routadate.getData);
routs.get("/profileget/:id", routadate.profileget);
routs.put("/updateProfileImage/:id", uploads.fields([{ name: 'profileImage', maxCount: 1 }]), routadate.updateProfileImage);
routs.put("/updateBannerImage/:id", uploads.fields([{ name: 'bannerImage', maxCount: 1 }]), routadate.updateBannerImage);
routs.post("/comment", routadate.comment);
routs.get("/getallcomment", routadate.getallcomment);















module.exports = routs;