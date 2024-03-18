const express = require('express');
const router = express.Router();
const {getReviewsByUser,getReviewById,updateReviewStatus} = require('../controllers/reviewController');
const isAuthenticated = require("../middleware/authMiddleware");

router.get('/:userId',isAuthenticated, getReviewsByUser);
router.get('/:reviewId',isAuthenticated, getReviewById);
router.put('/:reviewId',isAuthenticated, updateReviewStatus);

module.exports = router;
