//Autor: Furkan Kildan
const { getKurseFromStufe } = require('../../../database/querys/main');

//Gibt alle Kurse einer Stufe raus
async function handleKursFromLevel(req, res) {
  const { stufe } = req.body; //Speichert Stufe
  console.log(888888)
  try {
    const kurse = await getKurseFromStufe(stufe); 
    res.status(200).json(kurse);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Abrufen der Kurse' });
  }
}

module.exports = { handleKursFromLevel };
