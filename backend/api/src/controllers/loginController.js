const { openDatabase } = require('../../../database/databaseConnection');
const { getUser } = require('../../../database/querys/userQuerys')
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
    getUser(email, (err, result) => {
        if (err) {
            console.error('Error querying data:', err);
        } else {
            console.log('Query result:', result);
            res.json(getUserResponse(result));
        }
    });
}

module.exports = { handleGetUser, handleLogin };
