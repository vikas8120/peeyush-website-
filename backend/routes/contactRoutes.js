const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendMail = require("../utils/sendMail");

const auth = require("../middleware/auth");

router.post("/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();

        await sendMail(req.body);

        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Error in contact route:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/admin/contacts", auth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
