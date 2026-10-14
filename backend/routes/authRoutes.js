const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password, phone, email } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, error: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();
        res.json({ success: true, message: "Registered successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check by username or email as the frontend sends the login field as "username"
        const user = await User.findOne({ $or: [{ username: username }, { email: username }] });
        if (!user) return res.status(401).json({ success: false, error: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, error: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id, username: user.username, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
