//Autor: Sajiel Ahmad
const sqlite3 = require('sqlite3').verbose();
const dbUrl = process.env.DB_URL;

//Öffnet die Datenbank
function openDatabase() {
  return new sqlite3.Database(dbUrl, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Fehler:' + err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
}

//Schließt die Datenbank
function closeDatabaseConnection(db) {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Closed the database connection.');
      }
    });
  }
}


module.exports = { openDatabase, closeDatabaseConnection };
