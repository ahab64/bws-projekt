const { newUser } = require("../../../database/querys/userQuerys");
const validator = require('validator');

async function handleNewUser(req, res) {
    const newUserData = req.body;
    const name = newUserData.name;
    const email = newUserData.email;
    const pw = newUserData.password;
    const kurse = newUserData.kurse;
    const rolle = newUserData.rolle;
    const status = "Pending"

    // Datenvalidierung - Beispiel: Überprüfung der E-Mail-Adresse
    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
        return;
    }

    try {
        const result = await newUser(name, email, pw, kurse, rolle, status);
        console.log('Neuer Benutzer wurde erstellt:', result);
        res.status(201).json({ status: 201, message: 'Benutzer erfolgreich erstellt', userId: result });
    } catch (error) {
        console.error('Fehler bei der Benutzererstellung:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
}



module.exports = { handleNewUser };
