const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("email").normalizeEmail().isEmail().withMessage("Invalid email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 6, max: 32 })
    .withMessage("password must be between 6 and 32 characters"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 6, max: 32 })
    .withMessage("password must be between 6 and 32 characters")
    .custom((val, { req }) => {
      if (val !== req.body.password)
        throw new Error("Both passwords must be equal");
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (result.length == 0) return next();
  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserLogIn = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email/password needed")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email"),
  check("password").trim().not().isEmpty().withMessage("email/password needed"),
];
