const Review = require('../models/review.model');
const Gig = require('../models/gig');


async function getReviews(req, res) {
    const { gigId } = req.params;

    try {
        const reviews = await Review.find({ gigId: gigId });

        res.status(200).send(reviews);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function createReview(req, res) {
    const { body, userId } = req;

    //console.log(body);
    //console.log(userId)

    try {
        /**  TODO: prevent user from creating review on their own gig */

        const review = await Review.findOne({
            gigId: body.gigId,
            creatorId: userId
        });

        if(review) return res.status(403).send('You have already created a review for this gig');

        const newReview = await Review.create({
            ...body,
            creatorId: userId
        });

        await Gig.findByIdAndUpdate(body.gigId, { 
            $inc: { totalStars: body.stars, } 
        });

        res.status(201).send(newReview);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}

async function deleteReview(req, res) {
    try {
        
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}


module.exports = {
    getReviews,
    createReview,
    deleteReview
}