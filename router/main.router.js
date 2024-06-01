const express = require("express");
const mainController = require('../controllers/main.controller')
const apiRoutes = express.Router();

apiRoutes.get('/test', mainController.test)


module.exports = apiRoutes