const Order = require('../models/order');
const Gig = require('../models/gig');
const User = require('../models/user.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET);


async function getOrders(req, res) {
    const { isSeller, userId } = req;
    //console.log(isSeller);
    //console.log(userId)

    try {
        const filters = {
            ...(isSeller ? { sellerId: userId } : { buyerId: userId }),
            isCompleted: true
        };
        //console.log(filters)

        const orders = await Order.find(filters);

        res.status(200).send(orders);
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
}


/* async function createOrder(req, res) {
    const { body, userId, isSeller } = req;

    if(isSeller) return res.status(403).send('Only buyers can create orders');

    try {
        const gig = await Gig.findById(body.gigId); // use information from gig stored in db
                                                    // to ignore any information about the gig the user
                                                    // might've sent in the request other than gigId

        if(!gig) return res.status(500).send('Could not create that order');

        const user = await User.findById(userId);

        const newOrder = await Order.create({
            gigId: gig._id,
            image: gig.images[0],
            title: gig.title,
            buyerId: userId,
            buyerName: user.username,
            sellerId: gig.creatorId,
            sellerName: gig.creator,
            price: gig.price,
            paymentIntent: 'temporary'
        });

        res.status(200).send('Order created');
    } 
    catch(error) {
        res.status(500).send('Something went wrong');
    }
} */

async function createPaymentIntent(req, res) {
    const { gigId } = req.params;
    //console.log(gigId)
    const { userId, isSeller } = req;

    if(isSeller) return res.status(403).send('Only buyers can create orders');

    try {
        const gig = await Gig.findById(gigId); // use information from gig stored in db
                                           // to ignore any information about the gig the user
                                           // might've sent in the request other than gigId
        //console.log(gig)
        if(!gig) return res.status(500).send('Could not create that order');

        const user = await User.findById(userId);
        //console.log(user)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: (gig.price * 100),
            currency: "usd",
            automatic_payment_methods: {
              enabled: true,
            },
        });

        

        const newOrder = await Order.create({
            gigId: gig._id,
            image: gig.images[0],
            title: gig.title,
            buyerId: userId,
            buyerName: user.username,
            sellerId: gig.creatorId,
            sellerName: gig.creator,
            price: gig.price,
            paymentIntent: paymentIntent.id
        });

        res.status(201).send({ clientSecret: paymentIntent.client_secret });
    } 
    catch(error) {
        res.status(500).send(error);
    }
}

async function confirmIntent(req, res) {
    const { body } = req;

    try {
        await Order.findOneAndUpdate(
            { paymentIntent: body.paymentIntent },
            {
                $set: {
                    isCompleted: true
                }
            }
        );

        res.status(200).send('Order has been confirmed');
    } 
    catch(error) {
       res.status(500).send('Something went wrong'); 
    }
}

module.exports = {
    getOrders,
    createPaymentIntent,
    confirmIntent
}