const { updateUserStatus } = require('../../../database/querys/userQuerys');
const { getUserKurse } = require('../../../database/querys/userQuerys');

async function handleUserApproval(req, res) {
    const { userId, action } = req.body;

    try {
        if (action === 'approve') {
            await updateUserStatus(userId, 'Approved');
        } else if (action === 'block') {
            await updateUserStatus(userId, 'Blocked');
        } else {
            res.status(400).json({ error: 'Ungültige Aktion' });
            return;
        }

        res.status(200).json({ status: 200, message: 'Benutzerstatus erfolgreich aktualisiert' });
    } catch (error) {
        console.error('Fehler bei der Aktualisierung des Benutzerstatus:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

async function handleKurseFromUser(req, res) {
    const { userId } = req.body;

    try {
        const kurse = await getUserKurse(userId);

        if (!kurse || kurse.length === 0) {
            res.status(404).json({ error: 'Benutzer nicht gefunden oder hat keine Kurse' });
            return;
        }
       
        res.status(200).json({ status: 200, courses });
    } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerkurse:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = { handleUserApproval, handleKurseFromUser };
