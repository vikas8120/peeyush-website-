const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
const auth = require("../middleware/auth");

// GET All Packages (Public - for Website)
router.get("/packages", async (req, res) => {
    try {
        const packages = await Package.find().sort({ order: 1, price: 1 });
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Single Package
router.get("/packages/:id", async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: "Package not found" });
        res.json(pkg);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADMIN: Create Package
router.post("/packages", auth, async (req, res) => {
    try {
        const newPkg = new Package(req.body);
        await newPkg.save();
        res.status(201).json(newPkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ADMIN: Update Package
router.put("/packages/:id", auth, async (req, res) => {
    try {
        const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPkg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ADMIN: Delete Package
router.delete("/packages/:id", auth, async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ message: "Package deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Initialize Default Packages (Seed)
router.post("/packages/seed", async (req, res) => {
    try {
        const count = await Package.countDocuments();
        if (count > 0) return res.status(400).json({ message: "Packages already exist" });

        const defaults = [
            {
                name: "Silver Package",
                price: 45000,
                features: ["4 Hours Coverage", "50 Edited Photos", "Digital Album"],
                popular: false
            },
            {
                name: "Gold Package",
                price: 85000,
                features: ["Full Day Coverage", "100 Edited Photos", "Printed Album", "Cinematic Teaser"],
                popular: true
            },
            {
                name: "Platinum Package",
                price: 150000,
                features: ["2 Days Coverage", "Unlimited Photos", "Premium Album", "Drone & Cinematic Video"],
                popular: false
            }
        ];

        await Package.insertMany(defaults);
        res.json({ success: true, message: "Default packages seeded" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
