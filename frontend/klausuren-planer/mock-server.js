const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Wählen Sie einen Port Ihrer Wahl
const cors = require('cors');

app.use(cors());

// Definieren Sie Ihre Mock-Endpunkte hier
app.get('/api/data', (req, res) => {
  const mockData = {
    message: 'Dies ist ein Mock-Datensatz',
    date: new Date(),
  };
  res.json(mockData);
});

// Starten Sie den Server
app.listen(port, () => {
  console.log(`Der Mock-Server läuft auf Port ${port}`);
});

// Middleware zur Verarbeitung von JSON-Anfragen
app.use(bodyParser.json());

// Mock-POST-Endpunkt
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Simulierte Authentifizierung
  if (1) {
    const response = {
      status: 200,
      message: 'Anmeldung erfolgreich',
      userRole: 'admin',
      name: 'Merlin',
      userId: '0000'
    };
    res.status(200).json(response);
  } else {
    const errorResponse = {
      status: 401,
      message: 'Anmeldung fehlgeschlagen'
    };
    res.status(401).json(errorResponse);
  }
});