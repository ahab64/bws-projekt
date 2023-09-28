//Autor: Sajiel Ahmad
const { getUser } = require('../../../database/querys/main');
const { getUserResponse } = require('../utils/getUserResponse');
var bcrypt = require('bcryptjs');

//Gibt einen User durch email
function handleGetUser(req, res) {
    const email = req.params.email; //Speichert die email
    getUser(email, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            res.status(500).json({error: 'Error querying data', err});
        } else {
            console.log('Query result:', getUserResponse(result));
            res.status(500).json(result);
        }
    });
}

//Bearbeitet einen Login request
function handleLogin(req, res) {
    const requestData = req.body;
    console.log('Received POST request:', requestData);
    const email = requestData.email;
    const password = requestData.password;
    getUser(email, async (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            res.status(500).json({ err: 'User not found' });
        } else {
            console.log('Query result:', result);
            const userStatus = result.status;
            console.log(userStatus);
            const userPassword = result.password[0].password;
            if (!bcrypt.compare(password, userPassword)) {
                res.status(401).json({ error: 'Login failed' });
            } else {
                res.json((getUserResponse(result)))
            }
        }
    });
}

module.exports = { handleGetUser, handleLogin };
