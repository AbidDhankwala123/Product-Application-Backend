const Review = require('../models/reviews');

const getReviewsByUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const reviews = await Review.find({ author: userId });
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }
};

const getReviewById = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await Review.findById(reviewId);
        if (!review) {
            res.status(404);
            return next(new Error("Review not found"));
        }
        res.json(review);
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }
};

const updateReviewStatus = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { status } = req.body;

        // Check if the provided status is valid
        if (!['pending', 'rejected', 'approved'].includes(status)) {
            res.status(400);
            return next(new Error("Invalid status provided"));
        }

        const review = await Review.findByIdAndUpdate(reviewId, { status }, { new: true });

        if (!review) {
            res.status(400);
            return next(new Error("Review not found"));
        }

        res.json(review);
    } catch (error) {
        console.log(error);
        res.status(400);
        return next(new Error(error.message));
    }
};


module.exports = { getReviewsByUser, getReviewById, updateReviewStatus }
