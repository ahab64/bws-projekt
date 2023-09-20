async function insertKlausurTermin(kursId, dateStart, dateEnd, db) {
    try {
        const qryInsertKlausurtermin = "INSERT INTO Klausurtermine (kurs_id, date_start, date_ende) VALUES (?, ?, ?)";
        await new Promise((resolve, reject) => {
            db.run(qryInsertKlausurtermin, [kursId, dateStart, dateEnd], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); 
                }
            });
        });
        console.log("Klausurtermin hinzugefügt");
    } catch (error) {
        console.error('Fehler beim Einfügen des Klausurtermins:', error.message);
        throw error;
    }
}
module.exports = { insertKlausurTermin };