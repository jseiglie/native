require('dotenv').config()
const express = require("express");
const app = express();

//middlewares
app.use(express.json());


//server
const http = require("http");
const https = require("https");
//routes
const router = express.Router();
app.use("/api", router);

const mainRoutes = require("./router/main.router");
router.use("/main", mainRoutes);
const usersRoutes = require('./router/user.router');
router.use('/user', usersRoutes);
//db config
require('./config/db')

app.listen(3001, async () => {
   
  console.log("up and running on port 3001");
});
