const express = require('express');
const { validateToken } = require('../middleware/validateToken');
const { getMessages, createMessage } = require('../controllers/message.controllers');

const router = express.Router();

router.get('/:id', validateToken, getMessages);

router.post('/', validateToken, createMessage);

module.exports = router;