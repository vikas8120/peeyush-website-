const express = require('express');
const router = express.Router();

// Get Razorpay Public Key
router.get('/config', (req, res) => {
    res.json({
        key: process.env.RAZORPAY_KEY || 'rzp_test_1DP5mmOlF5G5ag'
    });
});

module.exports = router;
