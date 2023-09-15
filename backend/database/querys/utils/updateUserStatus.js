async function updateStatus(db, userId, newStatus){
    try {
        const queryResult = await db.run('UPDATE User SET status = ? WHERE user_id = ?', [newStatus, userId]);
        return queryResult;
    } catch {
        console.error('Fehler bei der Aktualisierung des Benutzerstatus:', error);
        throw error;
    }
}

module.exports = { updateStatus };