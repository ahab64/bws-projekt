// userQueries.js (Neues Modul für Benutzerabfragen)
const { openDatabase, closeDatabaseConnection } = require('../databaseConnection'); // Import der databaseConnection.js-Datei
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
    closeDatabaseConnection(this.db);

}

module.exports = { getUser };
