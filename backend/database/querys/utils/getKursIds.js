const { getFirstRow } = require("../shared/getFirstRow");


async function getKursIDs(kurse, db) {
    try {
        const kursIDs = [];

        for (let kurs of kurse) {
            const sqlSelectKursID = 'SELECT "id" FROM "Kurse" WHERE "name" = ?';
            const params = [kurs.kursName];

            const row = await getFirstRow(sqlSelectKursID, params, db);

            if (row) {
                kursIDs.push(row.id_kurs);
            }
        }

        console.log("Kursids erfolgreich zurückgegeben");
        return kursIDs;
    } catch (error) {
        console.error('Fehler:', error.message);
    }
}

module.exports = { getKursIDs };