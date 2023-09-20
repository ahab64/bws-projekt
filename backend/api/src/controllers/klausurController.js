const { newKlausurtermin } = require('../../../database/querys/main');

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

module.exports = { handleNewKlausurTermin };
