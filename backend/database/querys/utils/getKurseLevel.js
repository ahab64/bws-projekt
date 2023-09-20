async function getKurseLevel(stufe, db) {
    const sqlStatement = `
      SELECT
        name
      FROM Kurse
      WHERE name LIKE ?`;
  
    //Anhand von den ersten zwei Zeichen wird festgelegt, welche Kurse man von welcher Stufe benötigt.
    const stufePattern = `${stufe}_%`;
  
    return new Promise((resolve, reject) => {
      db.all(sqlStatement, [stufePattern], function (err, rows) {
        if (err) {
          console.error('Fehler bei der Datenbankabfrage:', err);
          reject(err);
        } else {
          const kurse = rows.map(row => row.name);
          console.log('Gefundene Kurse:', kurse); 
          resolve(kurse);
        }
      });
    });
  }

  module.exports = { getKurseLevel }
  