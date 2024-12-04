const datacolllection = require("../Model/userModel.js");
const comments = require("../Model/comment.js");
const postImages = require("../Model/postImage.js");
const Likes = require("../Model/Like.js");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const saltround = 10;
const jwt = require("jsonwebtoken");
const seckey = "Mominhussain";
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const signup = async (req, resp) => {
  try {
    const { fullName, email, password, phoneNo } = await req.body;

    const bannerImage = req.files.bannerImage[0].path;
    const profileImage = req.files.profileImage[0].path;

    console.log(bannerImage);
    console.log(profileImage);

    const salt = bcrypt.genSaltSync(saltround);
    const hash = bcrypt.hashSync(password, salt);

    const UploadprofileImage = await cloudinary.uploader.upload(profileImage);
    const UploadbannerImage = await cloudinary.uploader.upload(bannerImage);

    const data = new datacolllection({
      fullName: fullName,
      email: email,
      password: hash,
      phoneNo: phoneNo,
      profileImage: UploadprofileImage.secure_url,
      bannerImage: UploadbannerImage.secure_url,
    });

    data.save();
    resp.status(200).send({
      message: "User registered successfully",
      data: data,
    });
  } catch (error) {
    resp.send({
      status: 200,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const login = async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const getdata = await datacolllection.findOne({ email: email });
    console.log("LOGIN DATA GET >> ", getdata);

    if (!getdata) {
      return resp.status(404).send("User not found");
    }

    // Compare passwords
    const match = bcrypt.compareSync(password, getdata.password);
    if (!match) {
      return resp.status(404).send("Incorrect password");
    }
    jwt.sign({ getdata }, seckey, { expiresIn: "60m" }, (err, token) => {
      if (err) return resp.send({ err: err });
      resp.send({
        status: 200,
        message: "Login successfully",
        data: getdata,
        token: token,
      });
    });
  } catch (error) {
    resp.status(200).send({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const profileget = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await datacolllection.findOne({ _id: id });
    if (!user) return res.send({ message: "User not found" });
    res.send(user);
  } catch (error) {
    res.send({ message: "Server error" });
  }
};
const postImage = async (req, resp) => {
  try {
    const postImage = req.file;
    console.log(postImage);

    const upload = await cloudinary.uploader.upload(postImage.path);
    console.log(upload);
    const data = new postImages({
      postImage: postImage.secure_url,
    });

    data.save();

    resp.send({
      status: 200,
      message: "image post successfully",
      data: data,
    });
  } catch (error) {
    resp.send({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getallpostimage = async (req, resp) => {
  try {
    const data = await postImages.find();

    if (!data.length) {
      return resp.send("No data found");
    }

    resp.send({
      status: 200,
      message: "todo retrieved successfully",
      data: data,
    });
  } catch (error) {
    resp.send({
      status: 200,
      message: "error occurred",
      error: error.message,
    });
  }
};

const Like = async (req, resp) => {
  try {
    const { num } = req.body;

    const data = new Likes({
      Likes: num,
    });
    resp.send({
      status: 200,
      message: "like add successfully",
      data: data,
    });
    data.save();
  } catch (error) {
    resp.send({
      message: "An error occurred",
      error: error.message,
    });
  }
};
const comment = async (req, resp) => {
  try {
    const { comment } = req.body;

    const data = new comments({
      comment: comment,
    });

    data.save();

    resp.send({
      status: 200,
      message: "comment add successfully",
      data: data,
    });
  } catch (error) {
    resp.send({
      message: "An error occurred",
      error: error.message,
    });
  }
};
const getallcomment = async (req, resp) => {
  try {
    const data = await comments.find();

    if (!data.length) {
      return resp.send("No data found");
    }

    resp.send({
      status: 200,
      message: "get comment successfully",
      data: data,
    });
  } catch (error) {
    resp.send({
      status: 200,
      message: "error occurred",
      error: error.message,
    });
  }
};
const getData = async (req, resp) => {
  try {
    // Find User all data
    const data = await datacolllection.find();
    // Check if data not found
    if (!data.length) {
      return resp.status(404).send("No data found");
    }

    resp.status(200).send({
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    resp.status(500).send({
      message: "error occurred",
      error: error.message,
    });
  }
};

const updateProfileImage = async (req, resp) => {
  try {
    const profileImage = req.files.profileImage[0].path;
    const UploadprofileImage = await cloudinary.uploader.upload(profileImage);
    const userdata = await datacolllection.findByIdAndUpdate(
      req.params.id,
      { $set: { profileImage: UploadprofileImage.secure_url } },
      { new: true }
    );

    if (!userdata) {
      return resp.status(404).send("User not found");
    }

    resp.send({
      status: 200,
      message: "profile image updated successfully",
      data: userdata,
    });
  } catch (error) {
    resp.send({
      status: 200,
      message: "error occurred",
      error: error.message,
    });
  }
};

const updateBannerImage = async (req, resp) => {
  try {
    const bannerImage = req.files.bannerImage[0].path;
    const UploadbannerImage = await cloudinary.uploader.upload(bannerImage);
    const userdata = await datacolllection.findByIdAndUpdate(
      req.params.id,
      { $set: { bannerImage: UploadbannerImage.secure_url } },
      { new: true }
    );

    if (!userdata) {
      return resp.status(404).send("User not found");
    }

    resp.send({
      status: 200,
      message: "banner image updated successfully",
      data: userdata,
    });
  } catch (error) {
    resp.send({
      status: 200,
      message: "error occurred",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  profileget,
  login,
  getData,
  postImage,
  Like,
  comment,
  updateBannerImage,
  updateProfileImage,
  getallpostimage,
  getallcomment,
};
