const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const apiRoutes = require('./src/routes/apiRoutes'); // Neuer Importpfad

app.use(express.json());
app.use(cors());
app.use(apiRoutes); // Verwenden Sie die API-Routen aus apiRoutes.js

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
