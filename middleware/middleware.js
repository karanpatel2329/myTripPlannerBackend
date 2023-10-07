require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
     return res.status(401).send({
        message: "Please Provide Token to get Detail",
        error: "Please Provide Token to get Detail",
      });
    } else {
      const token = req.header("Authorization").replace("Bearer ", "");
      // console.log(token)

      const decode = jwt.verify(token, process.env.JWTTOKEN);
      // console.log(decode)
      var user = await User.findOne({ _id: decode._id });
      if (!user) {
        return res
          .status(401)
          .send({ message: "User Not Found", error: "User Not Found" });
      }
      req.token = token;
      req.user = user;
      // console.log(req.user)
    }
    next();
  } catch (error) {
    console.log(error);
   return res.status(401).send({ message: "Please Authenticate", error: error });
  }
};

module.exports = auth;