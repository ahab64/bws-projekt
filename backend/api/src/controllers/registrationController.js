//Autor: Sajiel Ahmad, Merlin Burbach
const { newUser, getUser } = require('../../../database/querys/main')
const validator = require('validator')
var bcrypt = require('bcryptjs');

//Erstellt einen neuen User
async function handleNewUser(req, res) {
    const newUserData = req.body;
    const name = newUserData.name;
    const email = newUserData.email;
    const pw = newUserData.password;
    const kurse = newUserData.kurse;
    const rolle = newUserData.rolle;

    const oldUser =  getUser(email, (err, res) => {
        if(res){
            return true;
        } else {
            return false;
        }
    })

    // Datenvalidierung
    if (!validator.isEmail(email)) {
        res.status(400).json({ error: 'Ungültige E-Mail-Adresse' });
        return;
    }

    if(oldUser){
        res.status(409).json({error: 'Email ist bereits registriert.'})
    }
    
    encyrptedPw = await bcrypt.hash(pw, 10);

    try {
        const result = await newUser(name, email, encyrptedPw, kurse, rolle);
        console.log('Neuer Benutzer wurde erstellt:', result);
        res.status(201).json({ status: 201, message: 'Benutzer erfolgreich erstellt', userId: result });
    } catch (error) {
        console.error('Fehler bei der Benutzererstellung:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }

}

module.exports = { handleNewUser };
