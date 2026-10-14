const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");
const router = require("express").Router();

// Initialize Razorpay
let razorpay;
try {
    if (process.env.RAZORPAY_KEY && process.env.RAZORPAY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });
    } else {
        console.warn("Razorpay credentials missing. Payments will fail.");
    }
} catch (err) {
    console.error("Razorpay Init Error:", err.message);
}

/* CREATE ORDER */
router.post("/create-order", async (req, res) => {
    if (!razorpay) return res.status(500).json({ error: "Payment gateway inactive" });

    const { bookingId, amount } = req.body;

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
        });

        if (bookingId) {
            await Booking.findByIdAndUpdate(bookingId, {
                razorpayOrderId: order.id,
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* VERIFY PAYMENT */
router.post("/verify-payment", async (req, res) => {
    const { order_id, payment_id, signature, bookingId } = req.body;

    if (!process.env.RAZORPAY_SECRET) return res.status(500).json({ success: false, message: "Secret missing" });

    const body = order_id + "|" + payment_id;
    const expected = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body)
        .digest("hex");

    if (expected === signature) {
        if (bookingId) {
            await Booking.findByIdAndUpdate(bookingId, {
                paid: true,
                razorpayPaymentId: payment_id,
            });
        }

        res.json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
});

module.exports = router;
