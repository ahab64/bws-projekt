const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port 3000 or specify a custom one

const { openDatabase, getUser, closeDatabaseConnection } = require('../database/databaseConnection');

// Define a sample route
app.get('/api/id/:id', (req, res) => {
    const id = req.params.id;
    const papa = "yarak";
    const mama = "schwanz";
    if(id == 123){
        res.json({ papa }); // Return the ID in a JSON response
        openDatabase();
        getUser((err, result) => {
            if (err) {
              console.error('Error querying data:', err);
            } else {
              console.log('Query result:', result);
            }
          });

        closeDatabaseConnection();
    }
    else{
        res.json({mama})
    }
});

app.post('/api/postData', (req, res) => {
    // Handle the incoming POST request here
    const requestData = req.body; // Access the request body
    console.log('Received POST request:', requestData);
    res.send('POST request received.'); // Send a response
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
