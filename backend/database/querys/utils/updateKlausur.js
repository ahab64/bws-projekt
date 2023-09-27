async function updateKlausurtermin(db, klausur_id, dateStart, dateEnd) {
    try {
        const queryResult = await db.run("UPDATE Klausurtermine SET date_start = ?, date_ende = ? WHERE klausur_id = ?", [dateStart , dateEnd, klausur_id]);
        return queryResult;
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Klausurtermins:', error);
        throw error;
    }
}

module.exports = { updateKlausurtermin };
