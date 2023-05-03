const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class AdminController {
  async create(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({
        success: false,
        message: "Please enter email or password",
      });
    } else {
      try {
        let newAdmin = new Admin();
        newAdmin.username = req.body.username;
        newAdmin.password = req.body.password;
        await newAdmin.save();
        let token = jwt.sign(newAdmin.toJSON(), process.env.SecretJWT, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
          message: "Successfully created a new admin",
        });
      } catch (err) {
        res.status(500).json({
          success: true,
          message: err.message,
        });
      }
    }
  }
  async login(req, res) {
    try {
      let foundAdmin = await Admin.findOne({ username: req.body.username });
      if (!foundAdmin) {
        res.status(403).json({
          success: false,
          message: "Admin not found",
        });
      } else {
        if (foundAdmin.comparePassword(req.body.password)) {
          let token = jwt.sign(foundAdmin.toJSON(), process.env.SecretJWT, {
            expiresIn: 604800,
          });

          res.json({ success: true, token: token });
        } else {
          res.status(403).json({
            success: false,
            message: "Wrong password!",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async profile(req, res) {
    try {
      let foundAdmin = await Admin.findOne({ _id: req.decoded._id });
      if (foundAdmin) {
        res.json({
          success: true,
          user: foundAdmin,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new AdminController();
