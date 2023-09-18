async function getKursId(kurs, db) {
    const sqlSelectKursID = 'SELECT kurs_id FROM Kurse WHERE name = ?';

    return new Promise((resolve, reject) => {
        db.get(sqlSelectKursID, [kurs], function (err, row) {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    console.log('Kurs Id erfolgreich selected: ' + row.kurs_id)
                    resolve(row.kurs_id);
                } else {
                    resolve(null);
                }
            }
        });
    });
}

module.exports = { getKursId };