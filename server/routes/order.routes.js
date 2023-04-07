const express = require('express');
const { validateToken } = require('../middleware/validateToken');
const { getOrders, createPaymentIntent, confirmIntent } = require('../controllers/order.controllers');

const router = express.Router();

router.get('/', validateToken, getOrders);

//router.post('/', validateToken, createOrder);
router.post('/create-payment-intent/:gigId', validateToken, createPaymentIntent);

router.put('/', validateToken, confirmIntent)

module.exports = router;
