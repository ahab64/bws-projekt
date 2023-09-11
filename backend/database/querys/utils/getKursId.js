async function getKursId(kurs, db) {
    const sqlSelectKursID = 'SELECT "id" FROM "Kurse" WHERE "name" = ?';

    return new Promise((resolve, reject) => {
        db.get(sqlSelectKursID, [kurs], function (err, row) {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    console.log('Kurs Id erfolgreich selteced' + row.id)
                    resolve(row.id);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

module.exports = { getKursId };