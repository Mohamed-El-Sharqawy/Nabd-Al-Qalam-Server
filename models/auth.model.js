const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Please Enter an Email"],
      validate: [isEmail, "Please Enter a Valid Email"],
    },
    password: {
      type: String,
      minlength: [8, "Minimum Password Length is 8 Characters"],
      required: [true, "Please Enter a Password"],
    },
  },
  {
    timestamps: true,
  }
);

// Fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  // Generating the Salt
  const salt = await bcrypt.genSalt();

  // Hashing the password and adding the salt to it
  this.password = await bcrypt.hash(this.password, salt);

  //! this keyword refers to the user object
  next();
});

UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
