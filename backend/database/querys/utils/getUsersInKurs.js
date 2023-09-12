async function getUsersInKurs(kurse, db) {
    const sqlSelectEmails = `
      SELECT User.email 
      FROM User 
      INNER JOIN "Kurs.User" ON User.user_id = "Kurs.User".id_user 
      INNER JOIN Kurse ON "Kurs.User".id_kurs = Kurse.id 
      WHERE Kurse.name = ?`;
    
    return new Promise((resolve, reject) => {
      db.all(sqlSelectEmails, [kurse], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          const emails = rows.map(row => row.email);
          console.log('E-Mails der Benutzer im Kurs ' + kurse + ': ' + emails.join(', '));
          resolve(emails);
        }
      });
    });
  }
  
  module.exports = { getUsersInKurs };
  