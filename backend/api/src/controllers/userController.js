const { updateUserStatus, getPendingUser } = require('../../../database/querys/main');

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

async function handlePendingUser(req, res) {
    try {
       const pendingUser = await getPendingUser();
       res.status(200).json(pendingUser);
    } catch (error) {
        console.error('Fehler beim Abrufen der Pending User', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}

module.exports = { handleUserApproval, handlePendingUser };

