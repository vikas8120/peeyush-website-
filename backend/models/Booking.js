const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    shootType: String,
    date: String,
    amount: Number,
    paid: { type: Boolean, default: false },
    paymentScreenshot: String, // Path to uploaded payment proof
    status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
    razorpayOrderId: String,
    razorpayPaymentId: String,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
