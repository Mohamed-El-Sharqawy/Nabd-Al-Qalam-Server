const User = require("../models/auth.model");

const users_get = async (_, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const users_get_one = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { users_get, users_get_one };
