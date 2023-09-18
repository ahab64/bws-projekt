async function getKurseFromUser(userId, db) {
  const sqlStatement = `
    SELECT
      k.name AS kursname,
      kt.date_start,
      kt.date_ende
    FROM Kurse AS k
    INNER JOIN "Kurs.User" AS ku ON k.kurs_id = ku.kurs_id
    INNER JOIN Klausurtermine AS kt ON k.kurs_id = kt.kurs_id
    WHERE ku.user_id = ?`;

  return new Promise((resolve, reject) => {
    db.all(sqlStatement, [userId], function (err, rows) {
      if (err) {
        reject(err);
      } else {
        const kursDates = rows.map(row => {
          const kursnameParts = row.kursname.split('_');
          const kurslehrer = kursnameParts.pop();
          const kursname = kursnameParts.join('_'); 
          return {
            kursname,
            kurslehrer,
            date_start: row.date_start,
            date_ende: row.date_ende
          };
        });
        console.log('Kurse mit Klausurterminen abgerufen:', kursDates);
        resolve(kursDates);
      }
    });
  });
}

module.exports = { getKurseFromUser };
