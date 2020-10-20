const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

const User = require("../../models/User");
const auth = require("../../middlewares/auth");

// @route  POST /api/auth
// @dec    test
// @access Public
router.post(
  "/",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { email, password } = req.body;
      // Check if user does really exists
      const user = await User.findOne({ email });

      if (!user) {
        res.staus(400).json({ errors: [{ msg: "Wrong credentials" }] });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Wrong credentails" }] });
      }

      const payload = {
        user_id: user._id,
        user_name: user.name,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: "7 days" },
        (err, token) => {
          if (err) throw err;
          res.json(token);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// @route  GET /api/auth
// @dec    Load user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
