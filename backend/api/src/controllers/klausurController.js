const { newKlausurtermin, updateKlausurTermin, deleteKlausurTermin } = require('../../../database/querys/main');

async function handleNewKlausurTermin(req, res) {
    const newKlausurterminData = req.body;
    const kurs_id = newKlausurterminData.kurs_id;
    const date_start = newKlausurterminData.date_start;
    const date_end = newKlausurterminData.date_ende;

    try {
        await newKlausurtermin(kurs_id, date_start, date_end);
        res.status(201).json({ status: 201, message: 'Klausurtermin erfolgreich erstellt' });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Klausurtermins:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function handleUpdateKlausurtermin(req, res) {
    const newKlausurterminData = req.body;
    const klausur_id = newKlausurterminData.klausur_id;
    const date_start = newKlausurterminData.date_start;
    const date_end = newKlausurterminData.date_ende;

    try {
        await updateKlausurTermin(klausur_id, date_start, date_end);
        res.status(201).json({ status: 201, message: 'Klausurtermin erfolgreich aktualisiert!' });
    } catch (error) {
        console.error('Fehler beim Aktualisieren des Klausurtermins:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function handleDeleteTermin(req, res) {
    const klausur_id = req.body.klausur_id;

    try {
        await deleteKlausurTermin(klausur_id);
        res.status(200).json({ status: 200, message: 'Klausurtermin erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen des Klausurtermins:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = { handleNewKlausurTermin, handleUpdateKlausurtermin, handleDeleteTermin };
