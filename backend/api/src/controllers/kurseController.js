const { getKurseUser } = require('../../../database/querys/main');

async function handleKursFromUser(req, res) {
  const { userId } = req.body;

  try {
    const kursInfos = await getKurseUser(userId);


    res.status(200).json(kursInfos);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Kurse' });
  }
}

module.exports = { handleKursFromUser };
