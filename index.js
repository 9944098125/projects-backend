require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// mongodb+srv://srinivas:thisisasecret@cluster0.pll6b.mongodb.net/dashboard

const authRoute = require("./routes/authRoute");
const projectRoute = require("./routes/projectRoute");

const app = express();

app.use(express.json());
app.use(cors());

// type node and press enter and then paste this to generate token
// require('crypto').randomBytes(64).toString('hex')
async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB database");
  } catch (err) {
    throw err;
  }
}

// console.log(process.env.MONGO_URI);
// console.log(process.env.JWT_SECRET_KEY);

app.use("/api/auth/", authRoute);
app.use("/api/projects/", projectRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 400;
  const errMessage = err.message || "something went wrong !";
  res.status(errStatus).json({
    message: errMessage,
    stack: err.stack,
  });
});
const port = process.env.PORT || 3000;
// console.log(process.env.PORT);

app.listen(port, () => {
  connect();
  console.log(`App is now running on PORT ${port}`);
});
