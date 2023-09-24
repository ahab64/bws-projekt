const { getKursId } = require("./getKursId");

async function utilInsertKursUser(userId, kursId, db) {
    return new Promise((resolve, reject) => {
        const sqlInsertKursUser = 'INSERT INTO "Kurs.User" ("user_id", "kurs_id") VALUES (?, ?)';
        db.run(sqlInsertKursUser, [userId, kursId], function (err) {
            if (err) {
                console.error('Fehler beim Einfügen in "Kurs.User":', err);
                reject(err);
            } else {
                console.log('Erfolgreich in "Kurs.User" eingefügt');
                resolve(this.lastID);
            }
        });
    });
}

async function insertIntoKursUser(db, userID, kurse) {
    console.log(kurse + "hshdhshd");
    try {
        for (let kurs of kurse) {
            const kursId = await getKursId(kurs, db);
            const kursUserId = await utilInsertKursUser(userID, kursId, db);
        }
    } catch (err) {
        console.error('Fehler beim Einfügen in Kurs.User:', err.message);
    }
}

module.exports = { insertIntoKursUser };
