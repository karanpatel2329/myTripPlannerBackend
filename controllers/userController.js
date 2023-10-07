const User = require("../models/user");

const bcrypt = require("bcryptjs");
const register = async (req, res) => {
    try {
      const isUser = await User.find({ email: req.body.email });
      if (isUser.length !== 0) {
        res.status(409).send({
          message: "User not created",
          error: "User Already Exists",
        });
      } else {
        var data = req.body;
        const user = new User(data);
        await user.generateAuthToken();
        await user.save();
        const t = user.toObject();
        delete t.password;
        const d = {
          data: t,
          message: "User Created Successfully",
        };
        res.status(200).send(JSON.stringify(d));
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      });
    }
  };

  const login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        var isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
          await user.generateAuthToken();
          const t = user;
          delete t.password;
          res.status(200).send({
            message: "User Login Successfully",
            data: t,
            error: "",
          });
        } else {
          res.status(401).send({
            message: "Invalid Password",
            error: "Invalid Password",
          });
        }
      } else {
        res.status(404).send({
          message: "User Not Found",
          error: "User Not Found",
        });
      }
    } catch (error) {
        console.log(error);
      res.status(500).send({
        message: "Something went wrong",
        error: "Something went wrong",
      });
    }
  };
  

  
module.exports = {
   login,
   register
  };