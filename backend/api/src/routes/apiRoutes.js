const express = require('express');
const router = express.Router();
const { handleGetUser, handleLogin } = require('../controllers/loginController');

router.get('/api/id/:email', handleGetUser);
router.post('/api/login', handleLogin);

module.exports = router;
