const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, country, password, image } =
      req.body;
    if (!(firstName || lastName || email || phone || country || password)) {
      res.status(400).json({ error: "All inputs are required..." });
    }
    const oldUser = await Users.findOne({ email });
    if (oldUser) {
      res
        .status(400)
        .json({ error: "Users already exists & if it is you, Please SIGN IN" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new Users({
      firstName,
      lastName,
      email,
      phone,
      country,
      image,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (err) {
    next(err);
    console.log("signup err: ", err);
  }
};

const sign_in = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All inputs are required");
    }
    // Validate if user exist in our database
    const user = await Users.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.JWT_SECRET_KEY
      );
      // user
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        country: user.country,
        image: user.image,
        token: token,
      });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    next(err);
    console.log("error", err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { userId, newPassword } = req.body;
    const existingUser = await Users.findOne({ _id: userId });
    if (existingUser) {
      const salt = bcrypt.genSaltSync(10);
      const securedPassword = await bcrypt.hashSync(newPassword, salt);

      const updatedPassword = await Users.findByIdAndUpdate(
        { _id: userId },
        { $set: { password: securedPassword } }
      );
      res.status(200).json({ message: "Updated the password successfully" });
    }
  } catch (err) {
    next(err);
    console.log("update password error in backend", err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const foundUser = await Users.findOne({ userId: userId });
    res
      .status(200)
      .json({ message: "User Found successfully", user: foundUser });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    const savedUser = await updatedUser.save();
    res
      .status(201)
      .json({ message: "User Updated successfully", user: savedUser });
  } catch (err) {
    next(err);
    console.log("update user error in backend", err);
  }
};

module.exports = {
  signup,
  sign_in,
  resetPassword,
  getUser,
  updateUser,
};
