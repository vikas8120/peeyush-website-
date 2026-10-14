const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');

// @route   POST /api/rating/add
// @desc    Submit a new rating
router.post('/add', async (req, res) => {
    try {
        const { rating, message, service } = req.body;

        if (!rating) {
            return res.status(400).json({ success: false, message: 'Rating is required' });
        }

        const newRating = new Rating({
            rating,
            message: message?.trim() || '',
            service: service || 'wedding',
            approved: false
        });

        await newRating.save();

        res.status(201).json({
            success: true,
            message: 'Thanks for your feedback ⭐',
            data: newRating
        });
    } catch (error) {
        console.error('Error submitting rating:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/rating/approved
// @desc    Get all approved ratings
router.get('/approved', async (req, res) => {
    try {
        const ratings = await Rating.find({ approved: true })
            .sort({ createdAt: -1 })
            .select('-__v');

        const avg = ratings.length > 0
            ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
            : 0;

        res.json({
            success: true,
            data: {
                ratings,
                average: parseFloat(avg),
                count: ratings.length
            }
        });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/rating/pending
// @desc    Get all pending ratings (Admin only)
router.get('/pending', async (req, res) => {
    try {
        const ratings = await Rating.find({ approved: false })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: { ratings }
        });
    } catch (error) {
        console.error('Error fetching pending ratings:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/rating/approve/:id
// @desc    Approve a rating
router.put('/approve/:id', async (req, res) => {
    try {
        const rating = await Rating.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true }
        );

        if (!rating) {
            return res.status(404).json({ success: false, message: 'Rating not found' });
        }

        res.json({
            success: true,
            message: 'Rating approved successfully',
            data: rating
        });
    } catch (error) {
        console.error('Error approving rating:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/rating/:id
// @desc    Delete a rating
router.delete('/:id', async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.id);
        if (!rating) {
            return res.status(404).json({ success: false, message: 'Rating not found' });
        }
        res.json({ success: true, message: 'Rating deleted successfully' });
    } catch (error) {
        console.error('Error deleting rating:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/rating/stats
// @desc    Get rating statistics
router.get('/stats', async (req, res) => {
    try {
        const stats = await Rating.aggregate([
            { $match: { approved: true } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        const result = stats.length > 0 ? {
            average: parseFloat(stats[0].averageRating.toFixed(1)),
            count: stats[0].totalReviews
        } : { average: 0, count: 0 };

        res.json({ success: true, data: result });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
