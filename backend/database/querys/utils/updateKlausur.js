async function updateKlausurtermin(db, kursId, dateStart, dateEnd) {
    try {
        const queryResult = await db.run("UPDATE Klausurtermine SET date_start = ?, date_ende = ? WHERE kurs_id = ?", [dateStart,dateEnd, kursId]);
        return queryResult;
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Klausurtermins:', error);
        throw error;
    }
}

module.exports = { updateKlausurtermin };
