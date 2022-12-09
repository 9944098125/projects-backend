const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, country, password } = req.body;
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
      res.status(200).json({ user, token });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log("error", err);
  }
};

module.exports = { signup, sign_in };
