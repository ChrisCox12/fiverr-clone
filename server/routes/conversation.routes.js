const express = require('express');
const { getConversation, getConversations, createConversation, updateConversation } = require('../controllers/conversation.controllers');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.get('/', validateToken, getConversations);
router.get('/:id', validateToken, getConversation);

router.post('/', validateToken, createConversation);

router.put('/:id', validateToken, updateConversation);


module.exports = router;