const sqlite3 = require('sqlite3').verbose();
let db;

function openDatabase() {
db = new sqlite3.Database('database/datenbank.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
if (err) {
    console.error(err.message);
} else {
    console.log('Connected to the SQLite database.');
}
});
}

function closeDatabaseConnection() {
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

function getUser(email, callback) {
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

    const courseId = userRow.id;
    const secondQuery = 'SELECT * FROM passwort WHERE id_user = ?';

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
}


// Other functions for database operations can go here

module.exports = { openDatabase, getUser, closeDatabaseConnection };
