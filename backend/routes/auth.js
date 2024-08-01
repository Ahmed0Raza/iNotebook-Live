const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'safestring';

// Route 1: Create a User (does not require authentication)
router.post(
  "/createuser",
  [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Enter a valid password').isLength({ min: 5 }), // Usually a longer minimum length is better
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user with this email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Email address already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      const data = {
        user: {
          id: user._id, // Assuming MongoDB assigns _id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });

    } catch (err) {
      console.error("Error creating user:", err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 2: Authenticate a User using: POST "/api/auth/login". No Login Required
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user._id, // Assuming MongoDB assigns _id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error("Error logging in:", error.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 3: Get Logged in user details using: POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
