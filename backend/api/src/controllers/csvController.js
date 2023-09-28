//Autor: Sajiel Ahmad
const { newUser } = require('../../../database/querys/main');

async function handleCsvUser(req, res) {
  try {
    const jsonData = typeof req.body === 'object' ? req.body : JSON.parse(req.body); //Enthält die JSON Daten

    if (!Array.isArray(jsonData)) {
      throw new Error('JSON data is not an array');
    }

    const insertPromises = [];

    for (const user of jsonData) {
      const { Name, Email, Password, Kurse, Rolle } = user; //Teilt die einzelnen Attribute eines Users
      console.log(jsonData);

      const newUserPromise = newUser(Name, Password, Email, Kurse, Rolle);
      insertPromises.push(newUserPromise);
    }

    await Promise.all(insertPromises);

    res.status(201).json({ status: 201, message: 'Users erfolgreich erstellt' });
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Users:', error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
}

module.exports = { handleCsvUser };
