const express = require('express');
const router = express.Router();
const { handleGetUser, handleLogin } = require('../controllers/loginController');
const { handleNewUser } = require('../controllers/registrationController');

router.get('/api/id/:email', handleGetUser);
router.post('/api/login', handleLogin);
router.post('/api/registration', handleNewUser);

//To Do: Endpunkte für...
//EMails einer Klasse
//Email eines Kurslehrers
//Kurse pro User
//Eintragung eins Klausurtermin (post)


module.exports = router;
