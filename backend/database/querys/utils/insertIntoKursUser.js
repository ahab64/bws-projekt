async function utilInsertKursUser(userId, kursId) {
    return new Promise((resolve, reject) => {
        const sqlInsertKursUser = 'INSERT INTO "Kurs.User" ("id_user", "id_kurs") VALUES (?, ?)';
        db.run(sqlInsertKursUser, [userId, kursId], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
}


async function insertIntoKursUser(db, userID, kursIds) {

    try {
        db.run('BEGIN TRANSACTION');

        for (let kursId of kursIds) {

            await utilInsertKursUser(userID, kursId)
        }
        db.run('COMMIT', (err) => {
            if (err) {
                console.error('Fehler beim Beenden der Transaktion:', err.message);
            } else {
                console.log('Transaktion erfolgreich abgeschlossen.');
            }

        });
    } catch (error) {
        console.error('Fehler InsertIntoKursUser:', error.message);
        // Bei einem Fehler die Transaktion rückgängig machen
        db.run('ROLLBACK');
    }
}

module.exports = { insertIntoKursUser };