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

function queryData(query, callback) {
    // Perform the query
    db.all(query, (err, rows) => {
    if (err) {
        console.error(err.message);
        db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        });
        return callback(err, null);
    }

    // Return the query results to the callback function
    callback(null, rows);
});
}


// Other functions for database operations can go here

module.exports = { openDatabase, queryData, closeDatabaseConnection };
