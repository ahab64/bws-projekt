const express = require('express');
const router = express.Router();
const auth = require('../../security/auth')
const { handleGetUser, handleLogin } = require('../controllers/loginController');
const { handleNewUser } = require('../controllers/registrationController');
const { handleEmailFromKurs } = require('../controllers/emailController');
const { handleUserApproval } = require('../controllers/userController');
const { handleKursFromUser } = require('../controllers/kurseController');
const { handleKursFromLevel } = require('../controllers/levelController');
const { handleNewKlausurTermin } = require('../controllers/klausurController');
const { handleDeleteTermin } = require('../controllers/klausurController');
const { handleUpdateKlausurtermin } = require('../controllers/klausurController');

router.get('/api/id/:email', auth, handleGetUser);
router.post('/api/login', handleLogin);
router.post('/api/registration', handleNewUser);
router.post('/api/kursemail', auth, handleEmailFromKurs);
router.post('/api/admin/user-approval', auth, handleUserApproval);
router.post('/api/kursfromuser', auth, handleKursFromUser);
router.post('/api/kursefromlevel', auth, handleKursFromLevel);
router.post('/api/klausureintrag', auth, handleNewKlausurTermin);
router.post('/api/deleteTermin', handleDeleteTermin);
router.post('/api/updateTermin', handleUpdateKlausurtermin);
//To Do: Endpunkte für...
//EMails einer Klasse
//Email eines Kurslehrers
//Kurse pro User
//Eintragung eins Klausurtermin (post)

module.exports = router;
