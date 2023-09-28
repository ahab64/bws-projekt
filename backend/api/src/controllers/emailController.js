//Autor: Furkan Kildan
const { getEmailsInKurs } = require('../../../database/querys/main');

//Gibt die Emails von allen Usern in einem Kurs
async function handleEmailFromKurs(req, res) {
  const { kurse } = req.body; //Speichert Kurse

  getEmailsInKurs(kurse, (err, emails) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Abrufen der E-Mails im Kurs' });
    }

    res.json(emails);
  });
}

module.exports = { handleEmailFromKurs };
