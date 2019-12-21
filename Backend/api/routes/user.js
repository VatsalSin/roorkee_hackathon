const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const checkAuth = require("../middleware/auth");

const User = require("../models/user");

// Signup API
router.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);
  const newUser = new User({
    name,
    email,
    password,
    phone
  });
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User Already exists" });

      // Create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          console.log("pass ", newUser.password);
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              {
                id: user.id
              },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                  }
                });
              }
            );
          });
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});
// Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) res.status(400).json({ msg: "User does not exist" });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) res.status(400).json({ msg: "Invalid credentials" });

        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                coins: user.points,
                stickers: user.stickers,
                complaintsFiled: user.complaintsFiled
              }
            });
          }
        );
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
