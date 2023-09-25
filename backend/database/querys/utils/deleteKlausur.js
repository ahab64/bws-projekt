async function deleteKlausurtermin(db, kursId) {
    try {
        const queryResult = await db.run("DELETE FROM Klausurtermine WHERE kurs_id = ?", [kursId]);
        return queryResult;
    } catch (error) {
        console.error('Fehler beim Löschen des Klausurtermins:', error);
        throw error;
    }
}

module.exports = { deleteKlausurtermin };
