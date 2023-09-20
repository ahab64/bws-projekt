const { getKurseFromStufe } = require('../../../database/querys/main');

async function handleKursFromLevel(req, res) {
  const { stufe } = req.body;

  try {
    const kurse = await getKurseFromStufe(stufe); 
    res.status(200).json(kurse);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Kurse' });
  }
}

module.exports = { handleKursFromLevel };
