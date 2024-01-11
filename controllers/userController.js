const User = require("../models/userModel");
const bycrpt = require("bycrpt");

const registerLoad = async (req, res) => {};
const register = async (req, res) => {
  try {
    const passwordHash = await bycrpt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: passwordHash,
      email: req.body.email,
      image: "images/" + req.file.filename,
    });
    await user.save();
    res.render("register", { message: "Registration Successful" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerLoad,
  register,
};
