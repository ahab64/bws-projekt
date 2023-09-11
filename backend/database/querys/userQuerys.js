// userQueries.js (Neues Modul für Benutzerabfragen)
const { openDatabase, closeDatabaseConnection } = require('../databaseConnection'); // Import der databaseConnection.js-Datei
const { getUserId } = require('./utils/getUserId');
const { insertIntoPassword } = require('./utils/insertIntoPassword');
const { insertIntoUser } = require('./utils/insertIntoUser');
const { getKursIDs } = require('./utils/getKursId');
const { insertIntoKursUser } = require('./utils/insertIntoKursUser');
let db;

function getUser(email, callback) {
  db = openDatabase();
  const query = 'SELECT * FROM User WHERE email = ?';
  db.get(query, [email], (queryErr, userRow) => {
    if (queryErr) {
      console.error(queryErr.message);
      callback(queryErr, null);
      return;
    }

    if (!userRow) {
      console.error('User not found');
      callback(new Error('User not found'), null);
      return;
    }

    const courseId = userRow.user_id;
    const secondQuery = 'SELECT * FROM passwort WHERE user_id = ?';

    db.all(secondQuery, [courseId], (secondQueryErr, courseRows) => {
      if (secondQueryErr) {
        console.error(secondQueryErr.message);
        callback(secondQueryErr, null);
      } else {
        const userData = {
          user: userRow.name,
          email: userRow.email,
          rolle: userRow.rolle,
          passwort: courseRows,
        };
        callback(null, userData);
      }
    });
  });
  closeDatabaseConnection(this.db);

}

async function newUser(name, email, passwort, kurse, rolle) {
  const db = openDatabase(); // Die Datenbankverbindung nur einmal öffnen

  try {
    //let kursIds = [];
    let userId;

    userId = await insertIntoUser(name, email, rolle, db);
    await insertIntoPassword(passwort, userId, db);
    await insertIntoKursUser(db, userId, kurse);

    return userId; // Erfolg: Benutzer-ID zurückgeben
  } catch (error) {
    console.error('Fehler bei der Benutzererstellung:', error);

    // Fehler: Etwas anderes oder null zurückgeben, um den Fehler anzuzeigen
    return null;
  } finally {
    closeDatabaseConnection(db); // Die Datenbankverbindung schließen, wenn alle Operationen abgeschlossen sind
  }
}


module.exports = { getUser, newUser };
