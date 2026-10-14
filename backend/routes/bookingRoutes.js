const router = require("express").Router();
const Booking = require("../models/Booking");
const sendSMS = require("../utils/sendSMS");
const generateInvoice = require("../utils/generateInvoice");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Create Booking
router.post("/bookings", async (req, res) => {
    try {
        const booking = await Booking.create(req.body);

        // Send SMS Confirmation
        if (booking.phone) {
            sendSMS(booking.phone);
        }

        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Booking (Frontend Compatibility)
router.post("/book", async (req, res) => {
    try {
        const { name, phone, service, date, price } = req.body;
        const amountVal = price ? parseFloat(price.replace(/[^0-9.-]+/g,"")) : 0;
        
        const booking = await Booking.create({
            name,
            phone,
            shootType: service,
            date,
            amount: amountVal
        });

        // Send SMS Confirmation
        if (booking.phone) {
            sendSMS(booking.phone);
        }

        res.json({ success: true, bookingRef: booking._id, booking });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// SS Upload Booking
router.post("/bookings/upload-ss", upload.single("screenshot"), async (req, res) => {
    try {
        const { name, phone, shootType, date } = req.body;
        const booking = await Booking.create({
            name, phone, shootType, date,
            amount: 2000,
            paymentScreenshot: req.file ? `/uploads/${req.file.filename}` : "",
            status: "Pending"
        });
        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.patch("/bookings/:id/approve", auth, async (req, res) => {
    try {
        const b = await Booking.findByIdAndUpdate(req.params.id, { paid: true, status: 'Approved' }, { new: true });
        res.json(b);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin: Get all bookings
router.get("/bookings", auth, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET Invoice for a specific booking
router.get("/bookings/:id/invoice", auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        generateInvoice(booking, res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
