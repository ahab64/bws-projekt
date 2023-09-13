const { updateUserStatus } = require('../../../database/querys/userQuerys'); 

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

module.exports = { handleUserApproval };
