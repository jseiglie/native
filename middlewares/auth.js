const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.status(403).send({
          success: false,
          message: "unauthorized access - missing user",
        });
      }
      req.user = user
      return next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(403).send({
          success: false,
          message: "unauthorized access - jwt error",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(403).send({
          success: false,
          message: "session expired, sign in",
        });
      }
      return res.status(403).send({
        success: false,
        message: "unauthorized access - else",
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: "unauthorized access - no token",
    });
  }
};
