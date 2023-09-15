const { getUserKurse } = require('../../../database/querys/main');

async function handleKurseFromUser(req, res) {
    const { userId } = req.body;

    try {
        const kurse = await getUserKurse(userId);
       
        if (!kurse || kurse.length === 0) {
            res.status(404).json({ error: 'Benutzer nicht gefunden oder hat keine Kurse' });
            return;
        }

        res.status(200).json({ status: 200, kurse });
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerkurse:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = { handleKurseFromUser};
