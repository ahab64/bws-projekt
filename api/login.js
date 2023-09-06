const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port 3000 or specify a custom one

const { openDatabase, getUser, closeDatabaseConnection } = require('../database/databaseConnection');
const { getResponse } = require('./response');
const cors = require('cors');

app.use(express.json()); 
app.use(cors());

// Define a sample route
app.get('/api/id/:email', (req, res) => {
const email = req.params.email;
const papa = "yarak";
const mama = "schwanz";
    res.json({ papa }); // Return the ID in a JSON response
    openDatabase();
    getUser(email ,(err, result) => {
        if (err) {
            console.error('Error querying data:', err);
        } else {
            console.log('Query result:', getResponse(result));
        }
        });
    closeDatabaseConnection();
});

app.post('/api/login', (req, res) => {
    // Handle the incoming POST request here
    const requestData = req.body; // Access the request body
    console.log('Received POST request:', requestData);
    const email = requestData.email;
    openDatabase();
    getUser(email ,(err, result) => {
        if (err) {
            console.error('Error querying data:', err);
        } else {
            console.log('Query result:', result);
            res.json(getResponse(result));
        }
        });
    closeDatabaseConnection();
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
