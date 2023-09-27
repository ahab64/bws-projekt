const express = require('express');
const router = express.Router();
const auth = require('../../security/auth')
const { handleGetUser, handleLogin } = require('../controllers/loginController');
const { handleNewUser } = require('../controllers/registrationController');
const { handleEmailFromKurs } = require('../controllers/emailController');
const { handleUserApproval, handlePendingUser } = require('../controllers/userController');
const { handleKursFromUser } = require('../controllers/kurseController');
const { handleKursFromLevel } = require('../controllers/levelController');
const { handleNewKlausurTermin } = require('../controllers/klausurController');
const { handleCsvUser } = require('../controllers/csvController');
const { handleDeleteTermin } = require('../controllers/klausurController');
const { handleUpdateKlausurtermin } = require('../controllers/klausurController');
const sendMailController = require('../controllers/sendMailController');

router.get('/api/id/:email', auth, handleGetUser);
router.post('/api/login', handleLogin);
router.post('/api/registration', handleNewUser);
router.post('/api/admin/user-approval', auth, handleUserApproval);
router.post('/api/kursfromuser', auth, handleKursFromUser);
router.post('/api/kursefromlevel', auth, handleKursFromLevel);
router.post('/api/csv',auth, handleCsvUser);
router.post('/api/kursemail', auth, handleEmailFromKurs);
router.post('/api/klausureintrag', auth, handleNewKlausurTermin);
router.post('/api/deleteTermin', auth, handleDeleteTermin);
router.post('/api/updateTermin', auth, handleUpdateKlausurtermin);
//Eintragen für Klausurtermine mit kursId oder kursname datum
//To Do: Endpunkte für...
//EMails einer Klasse
//Email eines Kurslehrers
//Kurse pro User
//Eintragung eins Klausurtermin (post)



//To Do: Endpunkte für...
//EMails einer Klasse
//Email eines Kurslehrers
//Kurse pro User
//Eintragung eins Klausurtermin (post)

module.exports = router;
