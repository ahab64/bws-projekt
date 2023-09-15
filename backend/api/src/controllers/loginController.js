const { getUser } = require('../../../database/querys/userQuerys');
const { getUserResponse } = require('../utils/getUserResponse');

function handleGetUser(req, res) {
    const email = req.params.email;
    const papa = "yarak";
    const mama = "schwanz";
    res.json({ papa }); // Return the ID in a JSON response
    getUser(email, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
        } else {
            console.log('Query result:', getUserResponse(result));
        }
    });
}

function handleLogin(req, res) {
    const requestData = req.body; // Access the request body
    console.log('Received POST request:', requestData);
    const email = requestData.email;
    const password = requestData.password;
    getUser(email, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
            res.status(500).json({ err: 'User not found' });
        } else {
            console.log('Query result:', result);
            const userPassword = result.passwort[0].passwort;
            console.log(result)
            if (userPassword != password) {
                res.status(401).json({ error: 'Login failed' });
            } else {
                res.json((getUserResponse(result)))
            }

        }
    });
}

module.exports = { handleGetUser, handleLogin };
