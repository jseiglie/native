const express = require("express");
const usersController = require('../controllers/users.controller');
const { validateUserSignUp, userValidation, validateUserLogIn } = require("../middlewares/validation/users.validation");
const { isAuth } = require("../middlewares/auth");
const apiRoutes = express.Router();

apiRoutes.get('/test', usersController.test);
apiRoutes.get('/list', usersController.listUsers);
apiRoutes.post('/signup', validateUserSignUp, userValidation, usersController.create);
apiRoutes.post('/login', validateUserLogIn,  userValidation, usersController.login)

apiRoutes.post('/private', isAuth, usersController.private)

apiRoutes.post('/upload', isAuth, usersController.uploads.single('avatar'), usersController.uploadFile)

module.exports = apiRoutes;