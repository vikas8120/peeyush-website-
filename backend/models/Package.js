const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., Silver Package
    price: { type: Number, required: true }, // e.g., 15000
    features: [String], // Array of features
    popular: { type: Boolean, default: false }, // Highlight tag
    category: { type: String, default: "Wedding" }, // e.g., Wedding, Pre-wedding
    order: { type: Number, default: 0 } // For display order
}, { timestamps: true });

module.exports = mongoose.model("Package", packageSchema);
