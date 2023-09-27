const { newUser } = require('../../../database/querys/main');

async function handleCsvUser(req, res) {
    try {
      // Assuming req.body contains the JSON data
      const jsonData = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
  
      if (!Array.isArray(jsonData)) {
        throw new Error('JSON data is not an array');
      }
  
      const insertPromises = [];
  
      for (const user of jsonData) {
        const { Name, Email, Password, Kurse, Rolle } = user;
  
        // Assuming newUser returns a promise
        const newUserPromise = newUser(Name, Password, Email, Rolle);
        insertPromises.push(newUserPromise);
      }
  
      await Promise.all(insertPromises); // Wait for all user inserts to complete
  
      console.log("sekerim");
      res.status(201).json({ status: 201, message: 'Users erfolgreich erstellt' });
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Users:', error);
      res.status(500).json({ error: 'Interner Serverfehler' });
    }
  }
  
  module.exports = { handleCsvUser };
  