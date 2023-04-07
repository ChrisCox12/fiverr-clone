const express = require('express');
const { createGig, deleteGig, getGig, getGigs, getGigsByUserId } = require('../controllers/gig.controllers');
const { validateToken } = require('../middleware/validateToken');
const router = express.Router();


router.get('/single/:id', getGig);
router.get('/', getGigs);
router.get('/my-gigs', validateToken, getGigsByUserId);

router.post('/', validateToken, createGig);

router.delete('/:id', validateToken, deleteGig);

module.exports = router;