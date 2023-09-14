const { getEmailsInKurs } = require('../../../database/querys/userQuerys');


async function handleEmailFromKurs(req, res) {
  const { kurse } = req.body; // Hier ändern wir req.params auf req.body

  getEmailsInKurs(kurse, (err, emails) => {
    if (err) {
      return res.status(500).json({ error: 'Fehler beim Abrufen der E-Mails im Kurs' });
    }

    res.json(emails);
  });
}

module.exports = {
  handleEmailFromKurs
};
