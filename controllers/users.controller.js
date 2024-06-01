const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userController = {};
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();
//multer.diskStorage() --> hdd storage, to define a directory to save it
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    console.log(file);
    //error, true
    cb(null, true);
  } else {
    cb("invalid image file");
  }
};
//line7  line9
userController.uploads = multer({ storage, fileFilter });

userController.test = async (req, res) => {
  console.log(
    "----------------------------------------------------TESTING-------------------------------------------"
  );
  try {
    res.send({ msg: "ok" });
  } catch (error) {
    return "!OK";
  }
};

userController.listUsers = async (req, res) => {
  try {
    const result = await Users.find();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(400)
      .send({ error: "error listing users ---> " + error.message });
  }
};

userController.create = async (req, res) => {
  try {
    const newUser = await Users.isThisEmailInUse(req.body.email);
    if (!newUser) {
      return res
        .status(400)
        .send({ success: false, message: "email already in use" });
    }
    const user = await Users.create(req.body);
    user.save();
    return res
      .status(200)
      .send({ success: true, message: "user created, please log in" });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "error listing users ---> " + error.message });
  }
};

userController.login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "no user with that email, try creating an account",
      });
    }

    if (await user.comparePassword(req.body.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).send({ success: true, token });
    }
    return res.status(400).send({
      success: false,
      message: "Email/Password combination wrong",
    });
  } catch (error) {
    res.status(400).send({ error: "Error login in ----> ", error });
  }
};

userController.private = async = (req, res) => {
  res.status(200).send({ sucess: true, user: req.user });
};

userController.uploadFile = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(403)
        .send({ sucess: false, message: "Unauthorized access" });
    console.log(req.file);
    const avatarBuffer = req.file.buffer;
    // const { width, height } = await sharp(avatarBuffer).metadata();
    const avatar = await sharp(avatarBuffer).resize(150, 150).toBuffer();
    await Users.findByIdAndUpdate(user._id, {
      avatar,
    });
    return res.status(201).send({success: true, message: 'Avatar updated'});
  } catch (error) {
    console.log('error uploading ', error);
    return res.status(201).send({success: false, message: 'server error, try again later'});
  }
};

module.exports = userController;
