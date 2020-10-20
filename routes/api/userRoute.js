const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('config')

const User = require("../../models/User");

// @route  POST /api/user
// @dec    Reegister
// @access Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password must contain at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    //   // Simple validation
    //   if (!name || !email || !password) {
    //     return res.status(400).json({ msg: "All fields are required" });
    //   }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exists
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "Wrong credenetials" });
      }

      // Create user
      const newUser = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);

      newUser.password = hashedPassword;

      await newUser.save();

      const payload = {
        user_id: newUser.id,
        user_name: newUser.name,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) throw err;
          res.json(token );
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
      console.log(error);
    }
  }
);

module.exports = router;
