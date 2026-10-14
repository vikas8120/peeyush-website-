const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json("Invalid");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json("Invalid");

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({ token });
});
const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/users", auth, async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/setup", async (req, res) => {
    try {
        const email = "admin@gunjan.com";
        const password = "admin";
        
        let admin = await Admin.findOne({ email });
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            admin = await Admin.create({ email, password: hashedPassword });
        } else {
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
            await admin.save();
        }
        res.json({ success: true, message: "Admin account ready. Email: admin@gunjan.com, Password: admin" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
