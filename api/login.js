const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port 3000 or specify a custom one

const { openDatabase, queryData, closeDatabaseConnection } = require('../database/databaseConnection');

var query = "SELECT * FROM User"

// Define a sample route
app.get('/api/id/:id', (req, res) => {
    const id = req.params.id;
    const papa = "yarak";
    const mama = "schwanz";
    if(id == 123){
        res.json({ papa }); // Return the ID in a JSON response
        openDatabase();
        queryData(query, (err, result) => {
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
