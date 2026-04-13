const express = require('express');
const router = express.Router();
const guidanceController = require('../controllers/guidanceController');

// Route for processing user text and returning Shlok guidance
router.post('/analyze-emotion', guidanceController.analyzeEmotion);

// Route for submitting user feedback
router.post('/feedback', guidanceController.submitFeedback);

// Route for fetching the global community healing counter
router.get('/stats', guidanceController.getStats);

// Route for fetching the daily Shlok
router.get('/daily-shlok', guidanceController.getDailyShlok);

module.exports = router;