async function getUsersInKurs(kurse, db) {
    const sqlSelectEmails = `
      SELECT User.email 
      FROM User 
      INNER JOIN "Kurs.User" ON User.user_id = "Kurs.User".user_id 
      INNER JOIN Kurse ON "Kurs.User".kurs_id = Kurse.kurs_id 
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
  