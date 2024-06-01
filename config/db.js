require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBADDRESS)
  .then((m) => {
    m.connection.getClient();
    console.log("db connected");
  })
  .catch((err) => console.log("error connecting to db ------------> ", err));
