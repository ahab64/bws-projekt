const { openDatabase, closeDatabaseConnection } = require('../databaseConnection');
const { getUserId } = require('./utils/getUserId');
const { insertIntoPassword } = require('./utils/insertIntoPassword');
const { insertIntoUser } = require('./utils/insertIntoUser');
const { getKursIDs } = require('./utils/getKursId');
const { insertIntoKursUser } = require('./utils/insertIntoKursUser');
let db;
const { getUsersInKurs } = require('./utils/getUsersInKurs');
const { updateStatus } = require('./utils/updateUserStatus');
const { getKurseFromUser } = require('./utils/getKurseFromUser');
const { getKurseLevel } = require('./utils/getKurseLevel');

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
    const secondQuery = 'SELECT * FROM Password WHERE user_id = ?';

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
          password: courseRows,
        };
        callback(null, userData);
      }
    });
  });
  closeDatabaseConnection(this.db);

}
//TO DO: remove error handling here
async function newUser(name, email, password, kurse, rolle) {
  const db = openDatabase(); // Die Datenbankverbindung nur einmal öffnen

  try {
    //let kursIds = [];
    let userId;

    userId = await insertIntoUser(name, email, rolle, db);
    await insertIntoPassword(password, userId, db);
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
  try {
    db = openDatabase();
    await updateStatus(db, userId, newStatus);
  } catch (error) {
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}


async function getKurseUser(userId) {
  try {
    db = openDatabase();

    const kurse = await getKurseFromUser(userId, db);

    if (!kurse || kurse.length === 0) {
      console.log('Keine Kurse gefunden für userId:', userId);
      throw new Error('Keine Kurse gefunden');
    }

    return kurse;
  } catch (error) {
    console.error('Fehler beim Abrufen der Kurse:', error);
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}

async function getKurseFromStufe(stufe) {
  try {
    db = openDatabase();

    const kurse = await getKurseLevel(stufe, db);

    if (!kurse || kurse.length === 0) {
      console.log('Keine Kurse gefunden für Stufe:', stufe);
      throw new Error('Keine Kurse gefunden');
    }

    return kurse;
  } catch (error) {
    console.error('Fehler beim Abrufen der Kurse:', error);
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}




module.exports = { getUser, newUser, getEmailsInKurs, updateUserStatus, getKurseUser, getKurseFromStufe };
