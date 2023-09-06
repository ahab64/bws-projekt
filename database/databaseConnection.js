const sqlite3 = require('sqlite3').verbose();

// Create a new database connection
function openDatabase(){
    const db = new sqlite3.Database('database/datenbank.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
    });
}

/* Insert data into the table
const username = 'john_doe';
const email = 'john@example.com';

db.run(`INSERT INTO users (username, email) VALUES (?, ?)`, [username, email], function (err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`A row has been inserted with rowid ${this.lastID}`);
}); */

// Query data from the table
function getKurse(){
    db.each(`SELECT * FROM Kurse`, (err, row) => {
    if (err) {
        console.error(err.message);
    }
    console.log(row);
    });
}


// Close the database connection when you're done
function closeDatabaseConnection() {
    db.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Closed the database connection.');
      }
    });
}

module.exports =  openDatabase, closeDatabaseConnection, getKurse;
