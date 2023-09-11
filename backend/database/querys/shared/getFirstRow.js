// Funktion zum Ausführen einer Abfrage und Rückgabe der ersten Zeile
async function getFirstRow(sql, params, db) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

module.exports = { getFirstRow };