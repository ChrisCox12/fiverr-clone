const express = require('express');
const { getReviews, deleteReview, createReview } = require('../controllers/review.controllers');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.get('/:gigId', getReviews);

router.post('/', validateToken, createReview);

router.delete('/:id', validateToken, deleteReview);


module.exports = router;