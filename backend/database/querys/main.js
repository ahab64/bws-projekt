//Autor: Furkan Kildan, Merlin Burbach, Sajiel Ahmad
const {
  openDatabase,
  closeDatabaseConnection,
} = require("../databaseConnection");
const { getUserId } = require("./utils/getUserId");
const { insertIntoPassword } = require("./utils/insertIntoPassword");
const { insertIntoUser } = require("./utils/insertIntoUser");
const { getKursIDs } = require("./utils/getKursId");
const { insertIntoKursUser } = require("./utils/insertIntoKursUser");
const { getUsersInKurs } = require("./utils/getUsersInKurs");
const { updateStatus } = require("./utils/updateUserStatus");
const { getKurseFromUser } = require("./utils/getKurseFromUser");
const { getKurseLevel } = require("./utils/getKurseLevel");
const { allPendingUsers } = require("./utils/getPendingUser");
const { insertKlausurTermin } = require("./utils/insertKlausurTermin");
const { updateKlausurtermin } = require("./utils/updateKlausur");
const { deleteKlausurtermin } = require("./utils/deleteKlausur");

let db;

//Gibt alle Email eines Kurses
async function getEmailsInKurs(kursName, callback) {
  db = openDatabase();
  try {
    const emailsUndRollen = await getUsersInKurs(kursName, db);
    callback(null, emailsUndRollen);
  } catch (error) {
    console.error('Fehler beim Abrufen der E-Mails im Kurs:', error);
    callback(error, null);
  } finally {
    closeDatabaseConnection(db);
  }
}


//Gibt einen User raus durch email
function getUser(email, callback) {
  db = openDatabase();
  const query = "SELECT * FROM User WHERE email = ?";
  db.get(query, [email], (queryErr, userRow) => {
    if (queryErr) {
      console.error(queryErr.message);
      callback(queryErr, null);
      return;
    }

    if (!userRow) {
      console.error("User not found");
      callback(new Error("User not found"), null);
      return;
    }

    const courseId = userRow.user_id; //Spiechert die User id
    const secondQuery = "SELECT * FROM Password WHERE user_id = ?";

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

//Erstellt einen Neuen User
async function newUser(name, email, password, kurse, rolle) {
  const db = openDatabase();

  try {
    let userId; //Speichert die neue User id

    userId = await insertIntoUser(name, email, rolle, db);
    await insertIntoPassword(password, userId, db);
    await insertIntoKursUser(db, userId, kurse);

    return userId;
  } catch (error) {
    console.error("Fehler bei der Benutzererstellung:", error);

    return null;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Updated den User Status
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

//Gibt all User mit Status Pending
async function getPendingUser() {
  try {
    db = openDatabase();
    const pendingUser = await allPendingUsers(db);
    return pendingUser;
  } catch (error) {
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Gibt alle Kurse eines Users aus
async function getKurseUser(userId) {
  try {
    db = openDatabase();

    const kurse = await getKurseFromUser(userId, db);

    if (!kurse || kurse.length === 0) {
      console.log("Keine Kurse gefunden für userId:", userId);
      return []; 
    }

    const kurseMitKlausurtermine = kurse.filter(
      (kurs) => kurs.date_start || kurs.date_ende
    );

    if (kurseMitKlausurtermine.length === 0) {
      return kurse.map((kurs) => ({
        id: kurs.id,
        kursname: kurs.kursname,
        kurslehrer: kurs.kurslehrer,
        date_start: "",
        date_ende: "",
      }));
    }

    return kurse;
  } catch (error) {
    console.error("Fehler beim Abrufen der Kurse:", error);
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Gibt alle Kurse einer Stufe zurück
async function getKurseFromStufe(stufe) {
  try {
    db = openDatabase();

    const kurse = await getKurseLevel(stufe, db);

    if (!kurse || kurse.length === 0) {
      console.log("Keine Kurse gefunden für Stufe:", stufe);
      throw new Error("Keine Kurse gefunden");
    }

    return kurse;
  } catch (error) {
    console.error("Fehler beim Abrufen der Kurse:", error);
    throw error;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Erstellt neuen Klausurtermin
async function newKlausurtermin(kursId, dateStart, dateEnd, db) {
  db = openDatabase();

  try {
    const eintrag = await insertKlausurTermin(kursId, dateStart, dateEnd, db);

    return eintrag;
  } catch (error) {
    console.error("Fehler beim Eintragen:", error);

    return null;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Updated einen Klausurtermin
async function updateKlausurTermin(klausur_id, dateStart, dateEnd, db) {
  db = openDatabase();

  try {
    const update = await updateKlausurtermin(db, klausur_id, dateStart, dateEnd)
    console.log('Update Erfolgt', klausur_id)
    return update;
  } catch (error) {
    console.error("Fehler beim Updaten:", error);

    return null;
  } finally {
    closeDatabaseConnection(db);
  }
}

//Löscht einen Klausurtermin
async function deleteKlausurTermin(klausur_id, db) {
  db = openDatabase();

  try {
    const del = await deleteKlausurtermin(db, klausur_id)
    console.log("Löschen erfolgt für Klausur", klausur_id);
    return del;
  } catch (error) {
    console.error("Fehler beim Löschen:", error);

    return null;
  } finally {
    closeDatabaseConnection(db);
  }
}

module.exports = {
  getUser,
  newUser,
  getEmailsInKurs,
  updateUserStatus,
  getKurseUser,
  getKurseFromStufe,
  newKlausurtermin,
  updateKlausurTermin,
  deleteKlausurTermin,
  getPendingUser,
};
