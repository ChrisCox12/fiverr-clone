const express = require('express');
const { testRoute, createUser, loginUser, deleteUser, getUser }  = require('../controllers/user.controllers');
const { validateToken } = require('../middleware/validateToken');

const router = express.Router();

router.get('/test', testRoute);
router.get('/single/:id', getUser);

router.post('/create', createUser);

router.delete('/delete/:id', validateToken, deleteUser);

module.exports = router;
