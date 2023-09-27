async function deleteKlausurtermin(db, klausur_id) {
    try {
        const queryResult = await db.run("DELETE FROM Klausurtermine WHERE klausur_id = ?", [klausur_id]);
        return queryResult;
    } catch (error) {
        console.error('Fehler beim Löschen des Klausurtermins:', error);
        throw error;
    }
}

module.exports = { deleteKlausurtermin };
