const { openDatabase, closeDatabaseConnection } = require('../databaseConnection'); 
const { getUserId } = require('./utils/getUserId');
const { insertIntoPassword } = require('./utils/insertIntoPassword');
const { insertIntoUser } = require('./utils/insertIntoUser');
const { getKursIDs } = require('./utils/getKursId');
const { insertIntoKursUser } = require('./utils/insertIntoKursUser');
let db;
const { getUsersInKurs } = require('./utils/getUsersInKurs');
const { updateStatus } = require('./utils/updateUserStatus');

//TO DO: remove error handling here
async function getEmailsInKurs(kursName, callback) {
  db = openDatabase();
  try {
    const emails = await getUsersInKurs(kursName, db);
    callback(null, emails);
  } catch (error) {
    console.error('Fehler beim Abrufen der E-Mails im Kurs:', error);
    callback(error, null);
  } finally {
    closeDatabaseConnection(db);
  }
}

//To do: refactor so logic is seperated in getUserFile
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
          status: userRow.status,
          passwort: courseRows,
        };
        callback(null, userData);
      }
    });
  });
  closeDatabaseConnection(this.db);

}
//TO DO: remove error handling here
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
    closeDatabaseConnection(db); 
  }
}

async function updateUserStatus(userId, newStatus) {
  try{
    db = openDatabase();
    await updateStatus (this.db, userId, newStatus);
  } catch(error) {
    throw error;
  } finally {
    closeDatabaseConnection(db); 
  } 
}


module.exports = { getUser, newUser , getEmailsInKurs, updateUserStatus};
