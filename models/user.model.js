const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//define schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: Buffer,
});

//will execute before saving to db
userSchema.pre("save", function (next) {
    //if password modified, 
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  }
});

//methods are for the query result
userSchema.methods.comparePassword = async function (password){
    if (!password) throw new Error('Password is missing, unable to compare');
    try {
        //                                  received , on the db
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('error while comparing password ----> ', error.message)
    }
}

//statics are for the table/document/model
userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Email cannot be empty");
  try {
    const user = await this.findOne({ email });
    return user ? false : true;
  } catch (error) {
    console.log("error on isThisEmailInUse statics", error.message);
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
