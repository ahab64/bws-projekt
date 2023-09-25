const express = require('express');
const router = express.Router();
const { handleGetUser, handleLogin } = require('../controllers/loginController');
const { handleNewUser } = require('../controllers/registrationController');
const { handleEmailFromKurs } = require('../controllers/emailController');
const { handleUserApproval } = require('../controllers/userController');
const { handleKursFromUser } = require('../controllers/kurseController');
const { handleKursFromLevel } = require('../controllers/levelController');
const { handleNewKlausurTermin } = require('../controllers/klausurController');
const { handleDeleteTermin } = require('../controllers/klausurController');
const { handleUpdateKlausurtermin } = require('../controllers/klausurController');

router.get('/api/id/:email', handleGetUser);
router.post('/api/login', handleLogin);
router.post('/api/registration', handleNewUser);
router.post('/api/kursemail', handleEmailFromKurs);
router.post('/api/admin/user-approval', handleUserApproval);
router.post('/api/kursfromuser', handleKursFromUser);
router.post('/api/kursefromlevel', handleKursFromLevel);
router.post('/api/klausureintrag', handleNewKlausurTermin);
router.post('/api/deleteTermin', handleDeleteTermin);
router.post('/api/updateTermin', handleUpdateKlausurtermin);

//To Do: Endpunkte für...
//EMails einer Klasse
//Email eines Kurslehrers
//Kurse pro User
//Eintragung eins Klausurtermin (post)

module.exports = router;
