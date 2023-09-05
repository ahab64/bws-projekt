const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use the default port 3000 or specify a custom one

// Define a sample route
app.get('/api/id/:id', (req, res) => {
    const id = req.params.id;
    const papa = "yarak";
    const mama = "schwanz";
    if(id == 123){
        const { db, closeDatabaseConnection } = require('../database/databaseConnection');
        res.json({ papa }); // Return the ID in a JSON response
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
